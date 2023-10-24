const getState = ({ getStore, getActions, setStore }) => {
	let backend = process.env.BACKEND_URL
	return {
		store: {
			message: null,
				user:{},
					demo: [
						{
							title: "FIRST",
							background: "white",
							initial: "white"
						},
						{
							title: "SECOND",
							background: "white",
							initial: "white"
						}
					]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			login:(email,password) => {
				fetch(backend+"api/login",{
					method:'POST',
					headers:{'Content-Type':'application/json'},
					body:JSON.stringify({email:email,password:password})
				}).then((resp)=>{
					if (resp.status !=200){
						alert("User not found! Try again...")
						return false						
					}
					else if (resp.status == 200){
						alert("User logged in...")
					}
					resp.json()})

					.then((data)=>{setStore({user:data})}
					)
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
