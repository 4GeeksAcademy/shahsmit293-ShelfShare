const getState = ({ getStore, getActions, setStore }) => {
  let backend = process.env.BACKEND_URL;
  return {
    store: {
      message: null,
      accessToken: null,
      user: {},
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      allbooks: [],
      ascendingbooks: [],
      descendingbooks: [],
      singlebook: [],
      years: [],
      users: [],
      wishlistBooks: [],
      singleUser: undefined,
      reverseallbook: [],
      activeuser: undefined,
      allchats: undefined,
      allinbox: undefined,
      contacted: [],
      matchingBooks: undefined,
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      logout: () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        setStore({ accessToken: null });
        setStore({ user: null });
      },
      handleLogout: () => {
        const { logout } = getActions();
        const confirmLogout = window.confirm("Are you sure?");
        if (confirmLogout) {
          logout();
          window.location.reload();
        }
      },

      updateStoreFromStorage: () => {
        let accessToken = sessionStorage.getItem("token");
        let userString= sessionStorage.getItem("user");
        let userObject= JSON.parse(userString);
        if (accessToken && accessToken != "" && accessToken != "undefined") {
          setStore({ accessToken: accessToken });
          setStore({ user: userObject });
        }
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      signup: (email, password, age, location, first_name, last_name) => {
        return fetch(backend + "api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name,
            age: age,
            location: location,
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setStore({
              user: data.user,
              accessToken: data.token,
              activeuser: data.user.id,
            });
            const userToString = JSON.stringify(data.user);
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("user", userToString);
          });
      },

      login: (email, password) => {
        const store = getStore();
        return fetch(backend + "api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            const actions = getActions();
            actions.logUserInTheStore(data);
          });
      },

      logUserInTheStore: (data) => {
        setStore({
          user: data.user,
          accessToken: data.token,
          activeuser: data.user.id,
        });
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
      },

      resetPassword:(token, newPassword) => {
        const store = getStore();
        return fetch(backend + "api/reset-password", {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({token: token, new_password: newPassword}),
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error resetting password.');
          }
        })
        .catch(error => {
          console.error(error);
          throw error;
        });
      },

      // add book
      addbook: (name, author, category, quantity, image, year, user_id) => {
        const store = getStore();
        return fetch(backend + "api/addbook", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
          },
          body: JSON.stringify({
            name: name,
            author: author,
            category: category,
            quantity: quantity,
            image: image,
            year: year,
            user_id: user_id,
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            store.allbooks.push(data.book);
          });
      },

      addWishlistBook: (name, author, user_id) => {
        const store = getStore();
        return fetch(backend + "api/wishlist_book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
          },
          body: JSON.stringify({
            name: name,
            author: author,
            user_id: user_id,
          }),
        })
          .then((resp) => {
            if (!resp.ok) {
              throw new Error("Network response was not ok");
            }
            return resp.json();
          })
          .then((data) => {
            setStore({
              wishlistBooks: [...store.wishlistBooks, data.wishlist_book],
            });
          })
          .catch((error) => {
            console.error("Error adding wishlist book:", error);
            // Handle the error or show an error message to the user
          });
      },

      //for all books
      allbooksdata: () => {
        fetch(backend + "api/allbooks")
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) => {
            const asc = [...data];
            const desc = [...data];
            const years = [...data];
            const reverse = [...data];
            setStore({
              allbooks: data,
              ascendingbooks: asc,
              descendingbooks: desc,
              years: years,
              reverseallbook: reverse,
            });
          });
      },

      loadAllUserInformation: () => {
        fetch(backend + "api/allusers")
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            }
          })
          .then((data) => {
            setStore({
              users: [...data],
            });
          });
      },

      //for single book
      singlebook: (j) => {
        const store = getStore();
        fetch(`${backend}api/book/${j}`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
          })
          .then((data) => {
            setStore({ singlebook: data });
          });
      },
      //for single user
      singleUser: (j) => {
        fetch(`${backend}api/user/${j}`)
          .then((resp) => {
            if (resp.ok) {
              return resp.json();
            }
          })
          .then((data) => {
            setStore({ singleUser: data });
          });
      },

      //addchat
      addchats: (sender_id, receiver_id, message) => {
        const store = getStore();
        return fetch(`${backend}api/addchat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
          },
          body: JSON.stringify({
            sender_id: sender_id,
            receiver_id: receiver_id,
            message: message,
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            return data.chat;
          });
      },

      //get messages
      getchats: (senderid, receiverid) => {
        const store = getStore();
        return fetch(`${backend}api/conversation/${senderid}&${receiverid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
          },
        })
          .then((response) => {
            if (response.headers.get("Content-Type") === "application/json") {
              return response.json();
            } else {
              throw new Error(
                "Expected JSON, got " + response.headers.get("Content-Type")
              );
            }
          })
          .then((data) => {
            console.log(data);
            setStore({
              allchats: data,
            });
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      },

      //get inbox messages list
      inboxchats: (inboxid) => {
        const store = getStore();
        return fetch(`${backend}api/inbox/${inboxid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${store.accessToken}`,
          },
        })
          .then((response) => {
            if (response.headers.get("Content-Type") === "application/json") {
              return response.json();
            } else {
              throw new Error(
                "Expected JSON, got " + response.headers.get("Content-Type")
              );
            }
          })
          .then((data) => {
            data.forEach((item) => {
              if (
                item.sender_id === inboxid &&
                !store.contacted.includes(item.receiver_id)
              ) {
                store.contacted.push({
                  contactuserid: item.receiver_id,
                  username: item.receiver.first_name,
                });
              } else if (
                item.receiver_id === inboxid &&
                !store.contacted.includes(item.sender_id)
              ) {
                store.contacted.push({
                  contactuserid: item.sender_id,
                  username: item.sender.first_name,
                });
              }
            });

            console.log(data);
            setStore({
              allinbox: data,
            });
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
      },

      deleteBook: (bookID) => {
        const store = getStore();
        fetch(`${backend}api/deletebook/${bookID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${store.accessToken}`,
          },
        })
          .then((resp) => {
            if (resp.ok) {
              window.location.reload();
            } else {
              console.error("error deleting book");
            }
          })
          .catch((error) => {
            console.error("error deleting book", error);
          });
      },

      deleteWishlistBook: (wishlistbookID) => {
        const store = getStore();
        fetch(`${backend}api/deletewishlistbook/${wishlistbookID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${store.accessToken}`,
          },
        })
          .then((resp) => {
            if (resp.ok) {
              window.location.reload();
            } else {
              console.error("Error deleting book from your wishlist");
            }
          })
          .catch((error) => {
            console.error("error deleting book from your wishlist", error);
          });
      },

      matchingWishlistBook: () => {
        const store = getStore();
        if (!store.singleUser) return;
        const matchingBooks = store.singleUser.wishlist_books.filter((book) => {
          return store.allbooks.find(
            (book2) => book.name === book2.name && book.author === book2.author
          );
          // store.allbooks.some(
          //  (book2) => book.name === book2.name && book.author === book2.author
          // );
        });
        setStore({
          matchingBooks: matchingBooks,
        });
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
      },
    },
  };
};

export default getState;
