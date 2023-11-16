import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { ResetPassword } from "./pages/resetPassword";
import { Login } from "./pages/login";
import { SignUp } from "./pages/signup";
import { Showbook } from "./pages/showbook";
import { Profile } from "./pages/profile";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Addbook } from "./pages/addbook";
import { Chat } from "./pages/chat";
import { Inbox } from "./pages/inbox";
import { Editbook } from "./pages/editbook";
import { Addwishlistbookbook } from "./pages/addwishlistbook";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<ResetPassword />} path="/resetPassword" />
            <Route element={<Login />} path="/login" />
            <Route element={<SignUp />} path="/signup" />
            <Route path="/profile/:userid" element={<Profile />} />
            <Route path="/showbook/:bookid" element={<Showbook />} />
            <Route path="/addbook" element={<Addbook />} />
            <Route path="/showbook" element={<Showbook />} />
            <Route path="/editbook/:book_id" element={<Editbook />} />
            <Route path="/addwishlistbook" element={<Addwishlistbookbook />} />
            <Route path="/chat/:senderid/:receiverid" element={<Chat />} />
            <Route path="/inbox/:inboxid" element={<Inbox />} />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
