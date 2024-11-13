import donation from './donation'

function Donation(props: donation){
    const {id, name, amount, email_address} = props
    console.log(props)
    return(
        <>
        <div className="mb-12">
        <div className="bg-[#171b26] w-full rounded-lg p-6 md:p-8">
        <div className="w-full flex justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://d14x58xoxfhz1s.cloudfront.net/6d26bf94-1114-446a-b9fa-948ee8b164d7"
              className="h-9 w-9 rounded-full"
            />

            <div className="flex">
              <p className="font-medium text-gray-100">{name?name: "Anonymous Donor"}</p>
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
              <span className="font-normal"> <span>Thus 31st 2024</span></span>
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
          <p>
            🗃️ ⚡ Thank you for your generous support! Your contribution is making a real difference and brings us closer to our goal. We deeply appreciate your kindness and commitment!
          </p>

          <div className="">
            <p className="text-3xl text-green-800">
                ${amount.slice(0,-2)}
            </p>
          </div>

          <div className="md:flex bg-[#20232e] rounded-md items-center">
            <img
                src="https://d14x58xoxfhz1s.cloudfront.net/6d26bf94-1114-446a-b9fa-948ee8b164d7"
                className="h-9 w-9 rounded-full"
                />
            <div className="p-3 flex justify-center">
              <p>
                {id}
              </p>
              <p>
                {email_address}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className=""></p>
        </div>
        </>
    )
}

export default Donation