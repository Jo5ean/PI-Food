import rootreducer from "./reducer"; //traemos el reducer
import { createStore, applyMiddleware } from "redux"; //funciones de redux para crear la store y para aplicarle los middlewares
import { composeWithDevTools } from "redux-devtools-extension"; //permite en el navegador ver las devtools
import thunk from "redux-thunk"; //middleware para hacer peticiones asincronas

const store = createStore(rootreducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;