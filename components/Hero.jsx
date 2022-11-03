import React from "react"

const Hero = () => {
  return (
    <div className="py-6">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div className="hidden lg:block lg:w-1/2 bg-cover custom-img" />
        <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">Buy Me Coffee</h2>
            <p className="text-xl text-gray-600 text-center">Hi, I'm Gusindra let's playing using Goerli Token.</p>
            
            <a href="#" className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
                <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Connect to Wallet</h1>
            </a>
          
            
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Coffee</label>
              <div className="grid w-auto grid-cols-3 space-x-2 rounded-xl bg-gray-200 p-2" x-data="app" >
                <div>
                  <input type="radio" name="option" id="1" className="peer hidden" checked />
                  <label
                    for="1"
                    className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                    >Small</label
                  >
                </div>
            
                <div>
                  <input type="radio" name="option" id="2" className="peer hidden" />
                  <label
                    for="2"
                    className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                    >Medium</label
                  >
                </div>
            
                <div>
                  <input type="radio" name="option" id="3" className="peer hidden" />
                  <label
                    for="3"
                    className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
                    >Large</label
                  >
                </div>
              </div>
                
            </div>
          
            <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" />
            </div>
            
            <div className="mt-4">
                <div className="flex justify-between">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Message</label>
                </div>
                <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" />
            </div>
          
            <div className="mt-8">
                <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Support</button>
            </div>
          
            <div className="mt-4 flex items-center justify-between">
                <span className="border-b w-1/5 md:w-1/4"></span>
                
                <span className="border-b w-1/5 md:w-1/4"></span>
            </div>
        </div>
        <div className="hidden">
                        <div>
                          <label>
                            Coffee
                          </label>
                          <br/>
                          
                          <input
                            id="name"
                            type="text"
                            placeholder="anon"
                            />
                        </div>
                        <br/>
                        <div>
                          <label>
                            Name
                          </label>
                          <br/>
                          
                          <input
                            id="name"
                            type="text"
                            placeholder="anon"
                            onChange={onNameChange}
                            />
                        </div>
                        <br/>
                        <div>
                          <label>
                            Send Gusin a message
                          </label>
                          <br/>
          
                          <textarea
                            rows={3}
                            placeholder="Enjoy your coffee!"
                            id="message"
                            onChange={onMessageChange}
                            required
                          >
                          </textarea>
                        </div>
                        <div>
                          <button className="bg-orange-800 p-4"
                            type="button"
                            onClick={buyCoffee}
                          >
                            Send 1 Coffee for 0.001ETH
                          </button>
                        </div>
                      </div>
    </div>
</div>
  )
}

export default Hero