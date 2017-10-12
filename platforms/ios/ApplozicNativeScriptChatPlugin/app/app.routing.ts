import { Login } from "./pages/login/login.component";
import { Conversation } from "./pages/conversations/conversation.component";
import { ChatWith } from "./pages/chatWith/chatWith.component";
import { StartNew } from "./pages/startNew/startNew.component";
import { Info } from "./pages/info/info.component";

export const routes = [
  { path: "", component: Login },
  { path: "login", component: Login },
  { path: "conversation/:devKey", component: Conversation },
  { path: "chatWith/:id/:whose", component: ChatWith },
  { path: "startNew/:devKey", component: StartNew },
  { path: "info/:whose", component: Info }
];

export const navigatableComponents = [
  Login,
  Conversation,
  ChatWith,
  StartNew,
  Info
];