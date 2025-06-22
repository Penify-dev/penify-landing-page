import { IconBuilding, IconMail, IconPhone } from "@tabler/icons-react";
import { Breadcrumb } from "../Breadcrumb/Breadcrumb";
import Link from "next/link";
import { ContactForm } from "./ContactForm/ContactForm";

export default function Contact() {
  return (
    <section className="w-full overflow-hidden">
      <Breadcrumb title="Contact Us" />

      <div className="w-full overflow-hidden py-8 md:py-16 xl:py-24">
        <div className="container mx-auto px-4">
          <div className="md:grid md:grid-cols-12">
            <div
              className="col-span-6"
              data-aos="fade-right"
              data-aos-duration="800"
            >
              <h2 className="mb-4 text-xl font-bold text-slate-200 md:mb-6 md:text-2xl lg:text-3xl">
                Get In Touch
              </h2>
              <p className="mb-6 text-sm text-slate-400 md:mb-8 md:text-base lg:text-lg">
                Got a technical issue? Want to send feedback about a beta
                feature? Need details about our Business plan? Let us know.
              </p>

              <dl className="my-8 text-slate-200">
                <div className="my-4 flex items-center space-x-2 transition-colors duration-200 ease-in hover:text-blue-600">
                  <dt className="flex-none">
                    <span className="sr-only">Email address</span>
                    <IconMail className="w-5 md:w-7" />
                  </dt>
                  <dd>
                    <Link
                      href="mailto:support@penify.dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm md:text-base xl:text-lg"
                    >
                      support@penify.dev
                    </Link>
                  </dd>
                </div>

{/*                 <div className="my-4 flex items-center space-x-2 transition-colors duration-200 ease-in hover:text-blue-600">
                  <dt className="flex-none">
                    <span className="sr-only">Phone Number</span>
                    <IconPhone className="w-5 md:w-7" />
                  </dt>
                  <dd>
                    <Link
                      href="tel:+91-959-158-3843"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm md:text-base xl:text-lg"
                    >
                      +91-959-158-3843
                    </Link>
                  </dd>
                </div>
 */}
                <div className="flex space-x-2">
                  <dt className="flex-none">
                    <span className="sr-only">Address</span>
                    <IconBuilding className="w-5 md:w-7" />
                  </dt>
                  <dd>
                    <address className="text-sm md:text-base xl:text-lg">
                      <p>
                        Snorkell Associates and Co., Office No. 415 OK Plus
                        Spaces, Near Apex Circle, Malviya Industrial Area,
                        Jaipur - 302017, Rajasthan, India
                      </p>
                    </address>
                  </dd>
                </div>
              </dl>
            </div>
            <div
              className="col-span-6"
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
