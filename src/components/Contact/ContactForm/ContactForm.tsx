import { inHouseAnalytics } from "@/utils/gtag";
import { sendGAEvent } from "@next/third-parties/google";
import { IconBrandTelegram } from "@tabler/icons-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";

interface FormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Renders a contact form component.
 *
 * This component uses React Hook Form for form handling and validation.
 * It sends the form data to an API endpoint when submitted, handles success and error messages,
 * and tracks events using Google Analytics and in-house analytics.
 *
 * @returns {JSX.Element} - The rendered contact form.
 */
export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // make api call
    try {
      const response = await fetch(
        "https://production-gateway.snorkell.ai/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // show a success message
      toast.success("Message sent successfully! We'll get back to you soon.", {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      sendGAEvent("event", "form_submission", { user: data.email });
      inHouseAnalytics("formSubmission",{ user: data.email })

      reset();
    } catch (err) {
      console.error("Error: ", err);
      // show an error message
      toast.error(
        "Failed to send message. Please try again later or contact us directly.",
        {
          position: "top-right",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        }
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-lg px-3 sm:px-4 py-4 sm:py-6"
      id="contact_us"
    >
      <div className="mb-4 sm:mb-6 md:mb-4">
        <label
          htmlFor="name"
          className="mb-1.5 sm:mb-2 block text-xs font-medium text-slate-200 md:text-sm xl:text-base"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          className={`w-full border px-3 sm:px-4 py-1.5 sm:py-2 text-sm ${
            errors.name ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none`}
          placeholder="Penify"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be atleast 2 characters",
            },
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Name can only contain alphabets and spaces",
            },
          })}
        />
        {errors.name && (
          <span className="block mt-1.5 sm:mt-2 text-xs md:text-sm xl:text-base text-red-600">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="mb-4 sm:mb-6 md:mb-4">
        <label
          htmlFor="email"
          className="block text-xs md:text-sm xl:text-base font-medium text-slate-200 mb-1.5 sm:mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className={`w-full border px-3 sm:px-4 py-1.5 sm:py-2 text-sm ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none`}
          placeholder="support@penify.dev"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <span className="mt-1.5 sm:mt-2 block text-xs text-red-600 md:text-sm xl:text-base">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="mb-6 sm:mb-8 md:mb-6">
        <label
          htmlFor="message"
          className="block text-xs md:text-sm xl:text-base font-medium text-slate-200 mb-1.5 sm:mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className={`w-full border px-3 sm:px-4 py-1.5 sm:py-2 text-sm ${
            errors.message ? "border-red-500" : "border-gray-300"
          } rounded-md shadow-sm focus:outline-none`}
          placeholder="Leave a comment..."
          {...register("message", { required: "Message is required" })}
        />
        {errors.message && (
          <span className="mt-1.5 sm:mt-2 block text-xs text-red-600 md:text-sm xl:text-base">
            {errors.message.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        className={`inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 ${
          isSubmitting ? "cursor-not-allowed opacity-50" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
        {isSubmitting ? "" : <IconBrandTelegram className="w-4 h-4 sm:w-5 sm:h-5" />}
      </button>
    </form>
  );
}
