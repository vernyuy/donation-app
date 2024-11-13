import { useEffect, useState } from "react";
import { EventsChannel, events } from "aws-amplify/data";
import { Amplify } from "aws-amplify";
import Donation from "./component/donation.tsx";
import { Link } from "@aws-amplify/ui-react";

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

function App() {
  const [myEvents, setMyEvents] = useState<any[]>([]);

  useEffect(() => {
    let channel: EventsChannel;

    const connectAndSubscribe = async () => {
      channel = await events.connect("default/stripe");

      channel.subscribe({
        next: (data: any) => {
          console.log("received", data);
          setMyEvents(() => [data]);
        },
        error: (err: any) => console.error("error", err),
      });
    };

    connectAndSubscribe();

    return () => channel && channel.close();
  }, []);

  return (
    <>

      <div>
        <nav className="sticky start-0 top-0 z-20 w-full bg-[#171b26] text-gray-50 border-b-2 border-gray-600">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between h-16 md:h-20">
            <div className="">
              <span className="ml-4 self-center whitespace-nowrap text-xl font-semibold">
                Fund Faising App
              </span>
            </div>
          </div>
        </nav>

        <div className="pt-1.5 md:pt-10 px-12 min-h-screen w-screen bg-[#373c48] flex justify-between text-gray-400 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col gap-12 justify-center">
            <div className="flex flex-col">
              <h3 className="text-5xl text-white font-extrabold">
                Let's Raise
              </h3>
              <p className="h-4"></p>
              <h3 className="text-3xl text-white text-start">Funds</h3>
            </div>
            <div className="w-full">
            <Link href="https://buy.stripe.com/test_4gw9EAcqI0cC6cMaEE" className=""><button className="border border-orange-600 px-6 py-3 rounded-full w-full">Donate Now</button></Link>
              
            </div>
          </div>
          <div className="w-full max-w-screen-md space-y-8 flex flex-col justify-center ">
            <div className="">
              <Donation
                key={1}
                id={"event.id"}
                amount={"5"}
                email_address={"event.email"}
                name={"event.name"}
              />
            </div>
            <div>
              {myEvents.map((event: any, index) => {
                console.log(myEvents)
               return <Donation
                  key={index}
                  id={event.event.id}
                  amount={event.event.amount}
                  email_address={event.email}
                  name={event.name}
                />
})}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
