import jwt_decode from "jwt-decode";
const  getID=async()=>{
    const token =localStorage.getItem("accessToken")
    const decoded = jwt_decode(token);
    return decoded.id;
}
export default getID