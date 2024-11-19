import { useEffect, useState } from "react";
import { EventsChannel, events } from "aws-amplify/data";
import { Amplify } from "aws-amplify";
import { Link } from "@aws-amplify/ui-react";
import Logo from "../public/donation.svg";

Amplify.configure({
  API: {
    Events: {
      endpoint:
        "https://la7natkymrg2pauacubuwiw4vi.appsync-api.us-east-1.amazonaws.com/event",
      region: "us-east-1",
      defaultAuthMode: "apiKey",
      apiKey: "da2-m7el57e7z5axlcwbc5vqvkapeu",
    },
  },
});

type Events = {
  id: string | number;
  color: string;
  amount: string | number;
  email: string;
};

function App() {
  const [myEvents, setMyEvents] = useState<Events[]>([]);

  useEffect(() => {
    let channel: EventsChannel;

    const connectAndSubscribe = async () => {
      channel = await events.connect("default/stripe");

      channel.subscribe({
        next: (data: Events) => {
          console.log("received", data);

          setMyEvents(() => [
            {
              id: data?.id,
              email: data?.email,
              amount: data?.amount,
              color: getRandomColor(),
            },
          ]);
        },
        error: (err: unknown) => console.error("error", err),
      });
    };

    connectAndSubscribe();

    return () => channel && channel.close();
  }, []);

  function getRandomColor() {
    const hex = Math.floor(Math.random() * 0xffffff).toString(16);
    return `#${hex.padStart(6, "0")}`;
  }

  return (
    <>
      <div className="">
        <nav className="sticky start-0 top-0 z-20 w-full bg-[#171b26] text-gray-50 border-b-2 border-gray-600">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between h-16 md:h-20">
            <div className="ml-4">
              <span className="ml-4 self-center whitespace-nowrap text-xl font-semibold ">
                <img src={Logo} className="h-8 md:h-10 -mt-6 md:-mt-5" />
              </span>
            </div>
          </div>
        </nav>

        <div className="h-full  px-3 w-full bg-[#373c48] -mt-5 flex justify-center text-gray-400  overflow-x-hidden">
          <div className="w-full max-w-screen-md pt-10 pb-20 space-y-7">
            <div className="relative overflow-hidden rounded-2xl mt-8 bg-cover bg-center bg-[url('https://images.squarespace-cdn.com/content/v1/5a2ba8479f07f51bfa2d71f6/1518285598484-5GDDE7HQS2WZGBYMBTQX/AOO_WEBSITE_IMAGES-04593.jpg')]">
              <div className="py-10 md:py-16 bg-gradient-to-r from-[#46ace5b3] to-[#610acfb3] rounded-2xl flex flex-col relative z-[1]">
                <h2 className="font-manrope font-bold text-2xl md:text-4xl text-white text-center mb-4 md:mb-6">
                  Ongoing Donations
                </h2>
                <p className="text-base font-inter text-white max-w-lg mx-auto mb-5 md:mb-8">
                  We have had{" "}
                  <span className="font-bold text-orange-500">
                    {myEvents.length}
                  </span>{" "}
                  donations so far
                </p>
                <div className="flex justify-center">
                  <Link
                    href="https://buy.stripe.com/test_4gw9EAcqI0cC6cMaEE"
                    target="_blank"
                    className=""
                  >
                    <button className="border border-white text-white max-w-fit px-6 py-2 rounded-full w-full">
                      Donate Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-[#171b26] w-full rounded-lg py-1 max-w-[150px]"></div>
            {myEvents.length === 0 ? (
              <div className="bg-[#171b26] w-full rounded-lg p-6 md:p-8">
                <div className="w-full flex items-center flex-wrap justify-center gap-10 mt-10">
                  <div className="grid gap-4 w-60">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-14 mx-auto"
                      viewBox="0 0 116 121"
                      fill="none"
                    >
                      <path
                        d="M0.206909 63.57C0.206909 31.7659 25.987 6.12817 57.6487 6.12817C89.2631 6.12817 115.079 31.7541 115.079 63.57C115.079 77.0648 110.43 89.4805 102.627 99.2755C91.8719 112.853 75.4363 121 57.6487 121C39.7426 121 23.4018 112.794 12.6582 99.2755C4.85538 89.4805 0.206909 77.0648 0.206909 63.57Z"
                        fill="#EEF2FF"
                      />
                      <path
                        d="M72.7942 0.600875L72.7942 0.600762L72.7836 0.599331C72.3256 0.537722 71.8622 0.5 71.3948 0.5H22.1643C17.1256 0.5 13.0403 4.56385 13.0403 9.58544V107.286C13.0403 112.308 17.1256 116.372 22.1643 116.372H93.1214C98.1725 116.372 102.245 112.308 102.245 107.286V29.4482C102.245 28.7591 102.17 28.0815 102.019 27.4162L102.019 27.416C101.615 25.6459 100.67 24.0014 99.2941 22.7574C99.2939 22.7572 99.2937 22.757 99.2934 22.7568L77.5462 2.89705C77.5461 2.89692 77.5459 2.89679 77.5458 2.89665C76.2103 1.66765 74.5591 0.876968 72.7942 0.600875Z"
                        fill="white"
                        stroke="#E5E7EB"
                      />
                      <circle cx="60.2069" cy="61" r="21.0256" fill="#EEF2FF" />
                      <path
                        d="M74.6786 46.1412L74.6783 46.1409C66.5737 38.0485 53.4531 38.0481 45.36 46.1412C37.2552 54.2341 37.2551 67.3666 45.3597 75.4596C53.4529 83.5649 66.5739 83.5645 74.6786 75.4599C82.7716 67.3669 82.7716 54.2342 74.6786 46.1412ZM79.4694 41.3508C90.2101 52.0918 90.2101 69.5093 79.4694 80.2502C68.7166 90.9914 51.3104 90.9915 40.5576 80.2504C29.8166 69.5095 29.8166 52.0916 40.5576 41.3506C51.3104 30.6096 68.7166 30.6097 79.4694 41.3508Z"
                        stroke="#E5E7EB"
                      />
                      <path
                        d="M83.2471 89.5237L76.8609 83.1309C78.9391 81.5058 80.8156 79.6106 82.345 77.6546L88.7306 84.0468L83.2471 89.5237Z"
                        stroke="#E5E7EB"
                      />
                      <path
                        d="M104.591 94.4971L104.59 94.4969L92.7346 82.653C92.7342 82.6525 92.7337 82.652 92.7332 82.6515C91.6965 81.6018 90.0076 81.6058 88.9629 82.6505L89.3089 82.9965L88.9629 82.6505L81.8573 89.7561C80.8213 90.7921 80.8248 92.4783 81.8549 93.5229L81.8573 93.5253L93.7157 105.384C96.713 108.381 101.593 108.381 104.591 105.384C107.6 102.375 107.6 97.5062 104.591 94.4971Z"
                        fill="#A5B4FC"
                        stroke="#818CF8"
                      />
                      <path
                        d="M62.5493 65.6714C62.0645 65.6714 61.6626 65.2694 61.6626 64.7729C61.6626 62.7866 58.6595 62.7866 58.6595 64.7729C58.6595 65.2694 58.2576 65.6714 57.761 65.6714C57.2762 65.6714 56.8743 65.2694 56.8743 64.7729C56.8743 60.422 63.4478 60.4338 63.4478 64.7729C63.4478 65.2694 63.0458 65.6714 62.5493 65.6714Z"
                        fill="#4F46E5"
                      />
                      <path
                        d="M70.1752 58.0694H66.4628C65.9662 58.0694 65.5642 57.6675 65.5642 57.1709C65.5642 56.6862 65.9662 56.2842 66.4628 56.2842H70.1752C70.6717 56.2842 71.0737 56.6862 71.0737 57.1709C71.0737 57.6675 70.6717 58.0694 70.1752 58.0694Z"
                        fill="#4F46E5"
                      />
                      <path
                        d="M53.8596 58.0693H50.1472C49.6506 58.0693 49.2487 57.6673 49.2487 57.1708C49.2487 56.686 49.6506 56.2841 50.1472 56.2841H53.8596C54.3443 56.2841 54.7463 56.686 54.7463 57.1708C54.7463 57.6673 54.3443 58.0693 53.8596 58.0693Z"
                        fill="#4F46E5"
                      />
                      <rect
                        x="28.9248"
                        y="16.3846"
                        width="30.7692"
                        height="2.05128"
                        rx="1.02564"
                        fill="#4F46E5"
                      />
                      <rect
                        x="28.9248"
                        y="100.487"
                        width="41.0256"
                        height="4.10256"
                        rx="2.05128"
                        fill="#A5B4FC"
                      />
                      <rect
                        x="28.9248"
                        y="22.5385"
                        width="10.2564"
                        height="2.05128"
                        rx="1.02564"
                        fill="#4F46E5"
                      />
                      <circle
                        cx="42.2582"
                        cy="23.5641"
                        r="1.02564"
                        fill="#4F46E5"
                      />
                      <circle
                        cx="46.3607"
                        cy="23.5641"
                        r="1.02564"
                        fill="#4F46E5"
                      />
                      <circle
                        cx="50.4633"
                        cy="23.5641"
                        r="1.02564"
                        fill="#4F46E5"
                      />
                    </svg>
                    <div>
                      <h2 className="text-center text-base font-semibold leading-relaxed pb-1">
                        There are no donations yet
                      </h2>
                      <p className="text-center text-sm font-normal leading-snug pb-4">
                        Click on the button above to donate!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full pt-5">
                {myEvents.map((event) => (
                  <div
                    key={event.id}
                    className="w-full max-w-screen-md  flex flex-col justify-center -my-5"
                  >
                    <div className="">
                      <div className="mb-12">
                        <div className="bg-[#171b26] w-full rounded-lg p-6 md:p-8">
                          <div className="w-full flex justify-between">
                            <div className="flex items-center gap-3">
                              <div
                                className="h-9 w-9 rounded-full"
                                style={{ backgroundColor: event.color }}
                              ></div>

                              <div className="flex">
                                <p className="font-medium text-gray-100">
                                  Anonymous Donor
                                </p>
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M12 14a2 2 0 1 1 0-4a2 2 0 0 1 0 4Z"
                                    />
                                  </svg>
                                </span>
                                <span className="font-normal">
                                  <span>Thus 31st 2024</span>
                                </span>
                              </div>
                            </div>
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"
                                />
                              </svg>
                            </div>
                          </div>

                          <div className="w-full px-11 pt-2 space-y-5">
                            <div className="">
                              <p
                                className="text-2xl font-bold"
                                style={{ color: event.color }}
                              >
                                $ {event.amount}
                              </p>
                            </div>

                            <p>Email: {event.email}</p>

                            <p>
                              🗃️ ⚡ Thank you for your generous support! Your
                              contribution is making a real difference and
                              brings us closer to our goal. We deeply appreciate
                              your kindness and commitment!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
