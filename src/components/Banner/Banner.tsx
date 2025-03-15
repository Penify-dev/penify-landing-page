import { IconStarFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface CounterTypes {
  users: number;
  repos: number;
}

/**
 * A functional component that displays a marketing banner with user and repository statistics.
 * The component fetches data from an external API to display the number of users and repositories.
 * It handles loading states and displays a loading indicator while the data is being fetched.
 *
 * @returns {JSX.Element} The rendered banner component.
 *
 * @throws {Error} Throws an error if the fetch request fails, which is logged to the console.
 */
export default function Banner() {
  const [counter, setCounter] = useState<CounterTypes>({
    users: 0,
    repos: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /**
     * Asynchronously retrieves the usage count of users and repositories from the analytics API.
     *
     * This function makes a network request to the specified API endpoint to fetch the current count
     * of users and repositories. Upon a successful response, it updates the state with the retrieved
     * values and sets the loading state to false. In case of an error during the fetch operation,
     * it logs the error to the console and ensures that the loading state is also set to false.
     *
     * @async
     * @function getCount
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     *
     * @throws {Error} Throws an error if the fetch operation fails, which is caught and logged.
     */
    const getCount = async () => {
      try {
        const response = await fetch(
          "https://production-gateway.snorkell.ai/api/v1/analytics/usage/count"
        );
        const { users, repos } = await response.json();
        setCounter({ users, repos });
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to get response: ", err);
        setIsLoading(false);
      }
    };

    getCount();
  }, []);

  return (
    <div
      id="marketting-banner"
      tabIndex={-1}
      className="bg-bannerBg w-full px-4 py-3"
    >
      <div className="container mx-auto">
        <div className="mb-3 me-4 flex flex-col items-center justify-center gap-2 md:mb-0 md:flex-row md:gap-4">
          <div className="flex gap-x-1 sm:items-center">
            <IconStarFilled width={18} color="#ffbc00" />
            <p className="text-center text-sm font-normal text-slate-200 md:text-base xl:text-lg">
              Trusted globally by{" "}
              <strong className="inline-block min-w-[60px] text-center">
                {isLoading ? "..." : `${counter.users}+`}
              </strong>{" "}
              users and Installed on
              <strong className="inline-block min-w-[80px] text-center">
                {isLoading ? "..." : `${counter.repos}+`}
              </strong>{" "}
              repositories
            </p>
          </div>

          {/* 
          <Link
            href="https://github.com/apps/penify-dev"
            className="me-2 flex items-center gap-x-1 rounded-lg bg-blue-700 px-5 py-2 text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandGithubFilled width={16} />
            Install on GitHub
          </Link>
          */}
        </div>
      </div>
    </div>
  );
}
