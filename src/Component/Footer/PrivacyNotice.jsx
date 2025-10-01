import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "./Footer";
import { noticeService } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiArrowDropRightLine } from "react-icons/ri";

const PrivacyAccordion = () => {
  const [openSections, setOpenSections] = useState({
    section1: false,
    section2: false,
    section3: false,
    section4: false,
    section5: false,
    section6: false,
    section7: false,
  });
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const response = await noticeService.getAll();
        setNotices(Array.isArray(response) ? response : response.data || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to load privacy notices");
        toast.error("Failed to load privacy notices");
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const toggleSection = (sectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  return (
    <>
      <Header />
      <div className="min-h-screen mt-20 px-4 py-6 sm:px-6 sm:py-10 text-[#333]">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-center mb-8">Privacy Notices</h1>

        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="max-w-7xl mx-auto space-y-4">
          {/* Dynamic Privacy Notices */}
          {notices.length > 0 ? (
            notices
              .filter((notice) => notice.type === "privacy-notice")
              .map((notice, index) => (
                <div
                  key={notice._id || notice.id || index}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                >
                  <button
                    onClick={() => toggleSection(`dynamic${index}`)}
                    className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#27AAE1] to-[#1c91c7] text-white text-lg font-semibold hover:from-[#1c91c7] hover:to-[#1577a1] transition-all duration-300 group"
                  >
                    <span className="text-left flex items-center">
                      <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                        {index + 1}
                      </span>
                      {notice.question || notice.title || "Privacy Notice"}
                    </span>
                    <span className="text-2xl font-bold transform transition-transform duration-300 group-hover:scale-110">
                      {openSections[`dynamic${index}`] ? "−" : "+"}
                    </span>
                  </button>
                  {openSections[`dynamic${index}`] && (
                    <div className="bg-gray-50 border-t border-gray-200">
                      <div className="px-6 py-6">
                        <div className="prose max-w-none">
                          <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                            {notice.answer || notice.description || ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
          ) : !loading && !error ? (
            <div className="text-center py-4">
              <p>No privacy notices available. Showing default content.</p>
            </div>
          ) : null}

          {/* Static Privacy Notice Cards (fallback) */}
          {notices.filter((notice) => notice.type === "privacy-notice")
            .length === 0 &&
            !loading && (
              <>
                {/* Privacy Notice Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                  <button
                    onClick={() => toggleSection("section1")}
                    className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#27AAE1] to-[#1c91c7] text-white text-lg font-semibold hover:from-[#1c91c7] hover:to-[#1577a1] transition-all duration-300 group"
                  >
                    <span className="text-left flex items-center">
                      <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                        1
                      </span>
                      Privacy Notice
                    </span>
                    <span className="text-2xl font-bold transform transition-transform duration-300 group-hover:scale-110">
                      {openSections.section1 ? "−" : "+"}
                    </span>
                  </button>
                  {openSections.section1 && (
                    <div className="bg-gray-50 border-t border-gray-200">
                      <div className="px-6 py-6">
                        <div className="prose max-w-none">
                          <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                            We know that you care about your personal data and
                            how it is used, and we want you to trust that
                            Vadodara Marathon uses your personal data carefully.
                            This Privacy Notice will help you understand what
                            personal data we collect, why we collect it and what
                            we do with it. As you read our Notice, please keep
                            in mind that it applies to Vadodara International
                            Marathon Please take a moment to familiarize
                            yourself with our privacy practices and let us know
                            if you have any questions by sending us an email or
                            submitting a request through the “Contact Us” form
                            on our websites. We have tried to keep this Notice
                            as simple as possible, but if you’re not familiar
                            with terms, such as cookies, IP addresses, and
                            browsers, then please read about these key terms
                            first.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Who collects the data Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                  <button
                    onClick={() => toggleSection("section2")}
                    className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#27AAE1] to-[#1c91c7] text-white text-lg font-semibold hover:from-[#1c91c7] hover:to-[#1577a1] transition-all duration-300 group"
                  >
                    <span className="text-left flex items-center">
                      <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                        2
                      </span>
                      Who collects the data?
                    </span>
                    <span className="text-2xl font-bold transform transition-transform duration-300 group-hover:scale-110">
                      {openSections.section2 ? "−" : "+"}
                    </span>
                  </button>
                  {openSections.section2 && (
                    <div className="bg-gray-50 border-t border-gray-200">
                      <div className="px-6 py-6">
                        <div className="prose max-w-none">
                          <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                            Any personal data provided to or collected by VM is
                            controlled by Vadodara International Marathon. This
                            Privacy Notice applies to personal data collected by
                            Vadodara Marathon in connection with the services
                            and products we offer. References to "VM" in this
                            Notice means Vadodara International Marathon and any
                            company directly or indirectly owned and/or
                            controlled by Vadodara International Marathon that
                            you are interacting with or have a business
                            relationship with. This Privacy Notice also applies
                            to VM's marketing content, including offers and
                            advertisements for VM products and services, which
                            we (or a service provider acting on our behalf) send
                            to you on third-party websites, platforms and
                            applications based on your site usage information.
                            These third-party websites generally have their own
                            Privacy Notice and Terms and Conditions. We
                            encourage you to read them before using those
                            websites.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* What Personal Data Is Being Collected Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                  <button
                    onClick={() => toggleSection("section3")}
                    className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#27AAE1] to-[#1c91c7] text-white text-lg font-semibold hover:from-[#1c91c7] hover:to-[#1577a1] transition-all duration-300 group"
                  >
                    <span className="text-left flex items-center">
                      <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                        3
                      </span>
                      What Personal Data Is Being Collected?
                    </span>
                    <span className="text-2xl font-bold transform transition-transform duration-300 group-hover:scale-110">
                      {openSections.section3 ? "−" : "+"}
                    </span>
                  </button>
                  {openSections.section3 && (
                    <div className="bg-gray-50 border-t border-gray-200">
                      <div className="px-6 py-6">
                        <div className="prose max-w-none">
                          <p className="text-gray-700 leading-relaxed text-base">
                            Personal data means any information that can be used
                            to identify directly or indirectly a specific
                            individual. You are not required to provide VM the
                            personal data that we request, but if you choose not
                            to do so, we may not be able to provide you with our
                            products or services, or with a high quality of
                            service or respond to any queries you may have.{" "}
                            <br />
                            <span className="font-bold">
                              We may collect personal data from a variety of
                              sources. This includes:
                            </span>
                            <ul className="list-disc pl-6 mt-2">
                              <li>Personal data you give us directly,</li>
                              <li>
                                Personal data we collect automatically, and
                              </li>
                              <li>
                                Personal data we collect from other sources.
                              </li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed text-base mt-4">
                              Personal data means any information that can be
                              used to identify directly or indirectly a specific
                              individual. This definition includes personal data
                              collected offline through our Participant
                              Engagement Campaigns, direct marketing campaigns,
                              sweepstakes and competitions and online through
                              our websites, applications and branded pages on
                              third-party platforms and applications accessed or
                              used through third-party platforms.
                            </p>{" "}
                            <br />{" "}
                            <p>
                              {" "}
                              You may be asked to provide your personal data
                              when you are in contact with us. Vadodara
                              International Marathon may share your personal
                              data internally and use it in a manner consistent
                              with this Privacy Notice. We may also combine it
                              with other information to improve our products,
                              services, content, and advertising.{" "}
                            </p>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* What Purpose Do We Use Your Data For Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                  <button
                    onClick={() => toggleSection("section4")}
                    className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#27AAE1] to-[#1c91c7] text-white text-lg font-semibold hover:from-[#1c91c7] hover:to-[#1577a1] transition-all duration-300 group"
                  >
                    <span className="text-left flex items-center">
                      <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                        4
                      </span>
                      What Purpose Do We Use Your Data For?
                    </span>
                    <span className="text-2xl font-bold transform transition-transform duration-300 group-hover:scale-110">
                      {openSections.section4 ? "−" : "+"}
                    </span>
                  </button>
                  {openSections.section4 && (
                    <div className="bg-gray-50 border-t border-gray-200">
                      <div className="px-6 py-6">
                        <div className="prose max-w-none">
                          <p className="text-gray-700 leading-relaxed text-base mt-2">
                            We collect, process and disclose your personal data
                            only for specific and limited purposes. For example,
                            to process your payments, to assess and handle any
                            complaints, to develop and improve our products,
                            services, communication methods and the
                            functionality of our websites, to provide
                            personalized products, communications and targeted
                            advertising as well as product recommendations to
                            you.
                          </p>
                          <p className="text-gray-700 leading-relaxed text-base mt-5">
                            We also create profiles by analyzing the information
                            about your online surfing, searching and buying
                            behavior and your interactions with our brand
                            communications by building segments (creating groups
                            that have certain common characteristics) and by
                            placing your personal data in one or more segments.
                          </p>
                          <p className="text-gray-700 leading-relaxed text-base mt-5">
                            Additionally, VM processes your personal data also
                            using automated means. An automated decision is a
                            decision which is made solely by automatic means,
                            where no humans are involved in the decision-making
                            process related to your personal data.
                          </p>
                          <span className="text-gray-700 leading-relaxed text-base mt-5">
                            We collect, process and disclose your personal data
                            for the following purposes:
                          </span>
                          <ul className="list-disc pl-6 mt-5">
                            <li className="mb-2">
                              To process your payments, if you purchase our
                              products, to provide you with your order status,
                              deal with your enquiries and requests, and assess
                              and handle any complaints;
                            </li>
                            <li className="mb-2">
                              To process and answer your inquiries or to contact
                              you to answer your questions and/or requests;
                            </li>
                            <li className="mb-2">
                              To develop and improve our products, services,
                              communication methods and the functionality of our
                              websites;
                            </li>
                            <li className="mb-2">
                              For the purposes of competitions or promotions
                              that you have entered;
                            </li>
                            <li className="mb-2">
                              To communicate information to you and to manage
                              your registration and/or subscription to our
                              newsletter or other communications;
                            </li>
                            <li className="mb-2">
                              To manage our everyday business needs regarding
                              your participation in our races, contests,
                              sweepstakes or promotional activities or request;
                            </li>
                            <li className="mb-2">
                              To authenticate the identity of individuals
                              contacting us by telephone, electronic means or
                              otherwise;
                            </li>
                            <li className="mb-2">
                              For internal training and quality assurance
                              purposes;
                            </li>
                            <li className="mb-2">
                              To understand and assess the interests, wants, and
                              changing needs of consumers, to improve our
                              website, our current products and services, and/or
                              developing new products and services; and
                            </li>
                            <li className="mb-2">
                              To provide personalized products, communications
                              and targeted advertising as well as product
                              recommendations to you.
                            </li>
                          </ul>
                          <p className="text-gray-700 leading-relaxed text-base mt-5">
                            When we collect and use your personal data for
                            purposes mentioned above or for other purposes, we
                            will inform you before or at the time of collection.
                          </p>
                          <p className="text-gray-700 leading-relaxed text-base mt-5">
                            Where appropriate, we will ask for your consent to
                            process the personal data. Where you have given
                            consent for processing activities, you have the
                            right to withdraw your consent at any time.
                          </p>
                          <p className="text-gray-700 leading-relaxed text-base mt-5">
                            We process your personal data to perform a contract
                            to which you are or will be a party. For example, we
                            need to process your personal data to deliver a
                            product or a service you bought, to allow you to
                            take part in one of our competitions, or to send you
                            samples that you have requested.
                          </p>
                          <p className="text-gray-700 leading-relaxed text-base mt-5">
                            We also process your personal data when we have a
                            legal obligation (e.g., tax or social security
                            obligations) to perform such processing. For
                            example, a court order may require us to process
                            personal data for a particular purpose, or we may be
                            compelled to process personal data to report
                            suspicious transactions under the local anti-money
                            laundering rules.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Who Will It Be Shared With Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                  <button
                    onClick={() => toggleSection("section5")}
                    className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#27AAE1] to-[#1c91c7] text-white text-lg font-semibold hover:from-[#1c91c7] hover:to-[#1577a1] transition-all duration-300 group"
                  >
                    <span className="text-left flex items-center">
                      <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                        5
                      </span>
                      Who Will It Be Shared With?
                    </span>
                    <span className="text-2xl font-bold transform transition-transform duration-300 group-hover:scale-110">
                      {openSections.section5 ? "−" : "+"}
                    </span>
                  </button>
                  {openSections.section5 && (
                    <div className="bg-gray-50 border-t border-gray-200">
                      <div className="px-6 py-6">
                        <div className="prose max-w-none">
                          <p className="text-gray-700 leading-relaxed text-base font-semibold mb-4">
                            As an international marathon, VM shares your
                            personal data internally and with selected
                            third-parties in the following circumstances:
                          </p>
                          <ul className="list-disc pl-6 space-y-4">
                            <li>
                              <span className="font-semibold text-gray-800">
                                Third-party service providers:
                              </span>
                              <span className="block text-gray-700 font-normal mt-1">
                                In order to carry out your requests, respond to
                                your inquiries, fulfil your orders, honor
                                coupons, provide you with samples, enable you to
                                participate in sweepstakes or make various other
                                features, services and materials available to
                                you through our websites we share your personal
                                data with third-party service providers that
                                perform functions on our behalf, such as
                                companies that: host or operate VM websites,
                                process payments, analyse data, provide customer
                                service, postal or delivery services, and
                                sponsors or other third-parties that participate
                                in or administer our promotions. They have
                                access to personal data needed to perform their
                                functions but may not use it for other purposes.
                                Further, they must process this personal data in
                                accordance with this Privacy Notice and as
                                permitted by applicable data protection laws and
                                regulations.
                              </span>
                            </li>
                            <li>
                              <span className="font-semibold text-gray-800">
                                Other third-parties:
                              </span>
                              <span className="block text-gray-700 font-normal mt-1">
                                Your personal data will also be used by us or
                                shared with our sponsors, advertisers,
                                advertising networks, advertising servers,
                                social media networks, and analytics companies
                                or other third-parties in connection with
                                marketing, promotional, data enrichment and
                                other offers, as well as product information.
                              </span>
                            </li>
                            <li>
                              <span className="font-semibold text-gray-800">
                                Business transfers:
                              </span>
                              <span className="block text-gray-700 font-normal mt-1">
                                Your personal data will be used by us or shared
                                with the internally, primarily for business and
                                operational purposes. Also, if any bankruptcy or
                                reorganization proceeding is brought by or
                                against us, all such personal data will be
                                considered an asset of ours and as such it is
                                possible they will be sold or transferred to
                                third-parties.
                              </span>
                            </li>
                            <li>
                              <span className="font-semibold text-gray-800">
                                Legal disclosure:
                              </span>
                              <ul className="list-none pl-0 mt-2 space-y-1">
                                <li className="flex items-start">
                                  <RiArrowDropRightLine className="text-xl text-[#27AAE1] mt-0.5" />
                                  <span className="ml-1 text-gray-700">
                                    To comply with a legal obligation;
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <RiArrowDropRightLine className="text-xl text-[#27AAE1] mt-0.5" />
                                  <span className="ml-1 text-gray-700">
                                    When we believe in good faith that an
                                    applicable law requires it;
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <RiArrowDropRightLine className="text-xl text-[#27AAE1] mt-0.5" />
                                  <span className="ml-1 text-gray-700">
                                    At the request of governmental authorities
                                    conducting an investigation;
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <RiArrowDropRightLine className="text-xl text-[#27AAE1] mt-0.5" />
                                  <span className="ml-1 text-gray-700">
                                    To verify or enforce our “Terms of Use” or
                                    other applicable policies;
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <RiArrowDropRightLine className="text-xl text-[#27AAE1] mt-0.5" />
                                  <span className="ml-1 text-gray-700">
                                    To detect and protect against fraud, or any
                                    technical or security vulnerabilities;
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <RiArrowDropRightLine className="text-xl text-[#27AAE1] mt-0.5" />
                                  <span className="ml-1 text-gray-700">
                                    To respond to an emergency; or otherwise
                                  </span>
                                </li>
                                <li className="flex items-start">
                                  <RiArrowDropRightLine className="text-xl text-[#27AAE1] mt-0.5" />
                                  <span className="ml-1 text-gray-700">
                                    To protect the rights, property, safety, or
                                    security of third-parties, visitors to VM
                                    websites, Vadodara Marathon or the public.
                                  </span>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                  <button
                    onClick={() => toggleSection("section6")}
                    className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#27AAE1] to-[#1c91c7] text-white text-lg font-semibold hover:from-[#1c91c7] hover:to-[#1577a1] transition-all duration-300 group"
                  >
                    <span className="text-left flex items-center">
                      <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                        6
                      </span>
                      International data transfers
                    </span>
                    <span className="text-2xl font-bold transform transition-transform duration-300 group-hover:scale-110">
                      {openSections.section6 ? "−" : "+"}
                    </span>
                  </button>
                  {openSections.section6 && (
                    <div className="bg-gray-50 border-t border-gray-200">
                      <div className="px-6 py-6">
                        <div className="prose max-w-none">
                          <p className="text-gray-700 leading-relaxed text-base">
                            VM shares personal data internally or with
                            third-parties for purposes described in this Privacy
                            Notice.
                          </p>
                          <p className="text-gray-700 leading-relaxed text-base mt-4">
                            If we do transfer personal data internationally, VM
                            will make sure that it is protected in the same way
                            as if it was being used in India. We’ll use one of
                            the following safeguards:
                          </p>
                          <ul className="list-disc pl-6 mt-2">
                            <li className="mb-2">
                              Put in place a contract with the foreign
                              third-party that means they must protect personal
                              data to the same standards as in India. Transfer
                              personal data to organizations that are part of
                              specific agreements on cross-border data transfers
                              with India.
                            </li>
                            <li className="mb-2">
                              VM takes the security of your personal data very
                              seriously. We take every effort to protect your
                              personal data from misuse, interference, loss,
                              unauthorized access, modification or disclosure.
                            </li>
                            <li className="mb-2">
                              Our measures include implementing appropriate
                              access controls, investing in the latest
                              Information Security Capabilities to protect the
                              IT environments we leverage, and ensuring we
                              encrypt, pseudonymise and anonymise personal data
                              wherever possible.
                            </li>
                            <li className="mb-2">
                              Access to your personal data is only permitted
                              among our employees and agents on a need-to-know
                              basis and subject to strict contractual
                              confidentiality obligations when processed by
                              third-parties.
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* How Do We Protect Your Personal Data Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                  <button
                    onClick={() => toggleSection("section7")}
                    className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-[#27AAE1] to-[#1c91c7] text-white text-lg font-semibold hover:from-[#1c91c7] hover:to-[#1577a1] transition-all duration-300 group"
                  >
                    <span className="text-left flex items-center">
                      <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                        7
                      </span>
                      How Do We Protect Your Personal Data?
                    </span>
                    <span className="text-2xl font-bold transform transition-transform duration-300 group-hover:scale-110">
                      {openSections.section7 ? "−" : "+"}
                    </span>
                  </button>
                  {openSections.section7 && (
                    <div className="bg-gray-50 border-t border-gray-200">
                      <div className="px-6 py-6">
                        <div className="prose max-w-none">
                          <p className="text-gray-700 leading-relaxed text-base">
                            VM takes the security of your personal data very
                            seriously. We take every effort to protect your
                            personal data from misuse, interference, loss,
                            unauthorised access, modification or disclosure.
                          </p>
                          <p className="text-gray-700 leading-relaxed text-base mt-4">
                            Our measures include implementing appropriate access
                            controls, investing in the latest Information
                            Security Capabilities to protect the IT environments
                            we leverage, and ensuring we encrypt, pseudonymise
                            and anonymise personal data wherever possible.
                          </p>
                          <p className="text-gray-700 leading-relaxed text-base mt-4">
                            Access to your personal data is only permitted among
                            our employees and agents on a need-to-know basis and
                            subject to strict contractual confidentiality
                            obligations when processed by third-parties.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
        </div>
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default PrivacyAccordion;
