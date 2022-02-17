import * as instance from "axios";

const axios = instance.create({
    baseURL:"http://localhost:8080/api"
});

const requestHandler = (request) =>{
    request.headers["Accept"] = "application/json";
    request.headers["Content-Type"] = "application/json";
    // Recuperamos del localS parseando porque localS guarda solo String
    const session = JSON.parse(localStorage.getItem("user")) || null;
    if (session) {
        request.headers["Authorization"]= `Bearer ${session.token}`;
    }
    return request;
}

const errorResponseHandler = (response) =>{
    //operador spreed (...), toma sus atributos con valores y los pasa a un nuevo obj
    return new Promise().reject({...response});
}

const successResponseHandler = (response) =>{
    return response.data;
}

//con cada peticion va a pasar por esta funciones
axios.interceptors.request.use((request) => requestHandler(request));

axios.interceptors.response.use(
    (response)=>successResponseHandler(response),
    (error)=> errorResponseHandler(error)
);

export default axios;