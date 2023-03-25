import { commonrequest } from "./ApiCall";
import { BASE_URL } from "./helper";





export const userSignIn = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/login`,data,header);
}

export const userAddFunc = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/addUser`,data,header);

    
}
export const userget = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/getUsers`,{},header);
}


// category get 
export const categoryAdd = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/addCategory`,data,header);

}
export const categoryGet = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/getCategory`,{},header);
}
export const deleteCategory = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/deleteCategory`,data,header);
}
export const getCategoryDetail = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/getCategoryDetail`,data,header);
}
export const editCategor = async(data,header)=>{
    return await commonrequest("PUT",`${BASE_URL}/editCategory`,data,header);
}

export const deletUser = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/deleteUser`,data,header);
}

// tasks

export const deleteTasks= async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/deleteTask`,data,header);
}
export const taskGet = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/getTask`,{},header);
}
export const registerfun = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/addTask`,data,header);
}

export const editTask=async(data,header)=>{
    return await commonrequest("PUT",`${BASE_URL}/editTask`,data,header);
}

export const getTaskDetail = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/getTaskDetail`,data,header);
}

export const getTask = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/getTask`,{},header);
}
//////////////////////////




export const singleUserget = async(id)=>{
    return await commonrequest("GET",`${BASE_URL}/user/${id}`,"");
}

export const edit = async(id,data,header)=>{
    return await commonrequest("PUT",`${BASE_URL}/user/edit/${id}`,data,header);
}



export const statusChange= async(id,data)=>{
    return await commonrequest("PUT",`${BASE_URL}/user/status/${id}`,{data})
}

