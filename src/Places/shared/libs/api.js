<<<<<<< HEAD
const auth_domain="https://identitytoolkit.googleapis.com/v1/accounts:";
const myapi="AIzaSyDu7T-C9LXeq_fZhGeVzszAro2hdSLONew";
const backend_link="https://combative-sunbonnet-crow.cyclic.app/";
// const backend_link="http://localhost:5000/"
console.log(process.env)
// const auth_domain=process.env.AUTH_DOMAIN
// const myapi=process.env.MY_API
// const backend_link=process.env.BACKEND_LINK
const FIREBASE_ERRORS={
    EMAIL_EXISTS: "The email address is already in use by another account.",
    OPERATION_NOT_ALLOWED: "Password sign-in is disabled for this project.",
    TOO_MANY_ATTEMPTS_TRY_LATER: "We have blocked all requests from this device due to unusual activity. Try again later.",
    EMAIL_NOT_FOUND: "There is no user record corresponding to this identifier. The user may have been deleted.",
    INVALID_PASSWORD: "The password is invalid or the user does not have a password.",
    USER_DISABLED: "The user account has been disabled by an administrator."
}
console.log(process.env)

export async function signUp(requestData){
    const email=requestData.email;
    const password=requestData.password;
    let response=await fetch(`${auth_domain}signUp?key=${myapi}`,{
        method:"post",
        body:JSON.stringify({
            email:email,
            password:password,
            returnSecureToken:true
        }),
        headers:{
            "Content-Type":"application/json"
        }
    })
    if(response.status !== 200 && response.status !== 201){
        let error="Request Failed! "||"Error Code : "||response.status;
        let errorcode=await response.json()
        if(errorcode && errorcode.error && errorcode.error.message){
            error=FIREBASE_ERRORS[errorcode.error.message]
        }
        throw new Error(error)
    }
    const data=await response.json();
    if(!data || !data.localId){
        throw new Error("Sorry... Signup Failed")
    }
    // console.log(requestData)
    const formData=new FormData()
    formData.append('name', requestData.firstname+" "+requestData.lastname)
    formData.append('username', requestData.username)
    formData.append('image', requestData.image)
    formData.append('emailId', email)
    formData.append('password', password)
    // console.log(formData)
    const response1=await fetch(`${backend_link}users/new`, {
        method: "post",
        body: formData
    })
    if(response1.status !== 200 && response1.status !== 201){
        const error=await response1.json()
        throw new Error(error.message)
    }
    const data1=await response1.json()
    if(data1.email !== data.email){
        throw new Error("Sorry... Signup Failed")
    }
    return {signUpInfo:data, userData: data1};
}
export async function signIn(requestData){
    const email=requestData.email;
    const password=requestData.password;
    let response=await fetch(`${auth_domain}signInWithPassword?key=${myapi}`,{
        method:"post",
        body:JSON.stringify({
            email:email,
            password:password,
            returnSecureToken:true
        }),
        headers:{
            "Content-Type":"application/json"
        }
    })
    if(response.status !== 200 && response.status !== 201){
        let error="Request Failed! "||"Error Code : "|| response.status
        const errorcode=await response.json();
        if(errorcode && errorcode.error && errorcode.error.message){
            error=FIREBASE_ERRORS[errorcode.error.message]
        }
        throw new Error(error)
    }
    const data=await response.json();
    if(!data || !data.localId){
        throw new Error("Unable to login")
    }
    const response1=await fetch(`${backend_link}sign-in`, {
        method: "post",
        body: JSON.stringify({
            emailId: email,
            password: password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if(response1.status !== 200 && response1.status !== 201){
        throw new Error("Request Failed! "||"Error Code: "||response1.status)
    }
    const data1=await response1.json()
    if(data1.email !== data.email){
        throw new Error("Unable to login")
    }
    return {loginInfo: data, userData: data1};
}
export async function getAllUsers(requestData){
    const query=requestData.params
    const params={
        page: new URLSearchParams(query).get("page"),
        limit: new URLSearchParams(query).get("limit")
    }
    if(Object.entries(params).find((e)=>{
        return (e[1] && (!parseInt(e[1]) || e[1] <= 0))}
        )){
        throw new Error("No User found for the given parameters")
    }
    const response=await fetch(`${backend_link}users${query}`, {
        method: "get",
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error.message)
    }
    const data=await response.json()
    // console.log(data)
    if(!data || data === null || !data.users || data.users.length <= 0){
        throw new Error("No User found")
    }
    data.users.map(async(user)=>{
        if(user.image){
            const image=await fetchImage(user.image)
            return {...user, image: image}
        }else{
            return user
        }
    })
    return ({...data.users})
}
export async function getUserByID(requestData){
    const { id }=requestData
    const response=await fetch(`${backend_link}user/${id}`, {
        method: "get",
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error.message)
    }
    const data=await response.json()
    // console.log(data)
    if(!data || data === null || !data.user){
        throw new Error("No User found for the given ID")
    }
    return (data.user)
}
export async function updateUser(requestData){
    const response=await fetch(`${backend_link}update-user/${requestData.id}`, {
        method: "patch",
        body: JSON.stringify({
            name: requestData.firstname+" "+requestData.lastname,
            username: requestData.username,
            emailId: requestData.email,
            password: requestData.password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error.message)
    }
    const data=await response.json()
    // console.log(data)
    if(!data || data === null || !data.updatedUser){
        throw new Error("Unable to update or fetch this User, please try after sometime")
    }
    return (data.updatedUser)
}
export async function deleteUser(requestData){
    const response=await fetch(`${backend_link}delete-user/${requestData.id}`, {
        method: "delete",
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error.message)
    }
    const data=await response.json()
    // console.log(data)
    if(!data || data === null || !data.deletedUser){
        throw new Error("Unable to delete this user, please try after sometime")
    }
    return (data.deletedUser)
}
export async function getAllPlaces(requestData){
    const query=requestData.params
    const params={
        page: new URLSearchParams(query).get("page"),
        limit: new URLSearchParams(query).get("limit")
    }
    if(Object.entries(params).find((e)=>{
        return (e[1] && (!parseInt(e[1]) || e[1] <= 0))}
        )){
        throw new Error("No Place found for the given parameters")
    }
    const response=await fetch(`${backend_link}places${query}`, {
        method: "get",
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error.message)
    }
    const data=await response.json()
    // console.log(data)
    if(!data || data === undefined || data === null){
        throw new Error("No Place found")
    }
    return (data)
}
export async function getPlaceByPlaceId(requestData){
    const { id }=requestData
    const response=await fetch(`${backend_link}place/${id}`, {
        method: "get"
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error.message)
    }
    const data=await response.json()
    if(!data || !data.place || data.place === null){
        throw new Error("No place found for the given ID")
    }
    return (data.place)
}
export async function getPlacesByUserId(requestData){
    const {id, params:query}=requestData
    const params={
        page: new URLSearchParams(query).get("page"),
        limit: new URLSearchParams(query).get("limit")
    }
    if(Object.entries(params).find((e)=>{
        return (e[1] && (!parseInt(e[1]) || e[1] <= 0))}
        )){
        throw new Error("No Place found for the given parameters")
    }
    const response=await fetch(`${backend_link}users/${id}${query}`, {
        method: "get",
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error.message)
    }
    const data=await response.json()
    if(!data || !data.places || data.places === null || data.places.length <= 0){
        throw new Error("No place found for the given parameters")
    }
    return (data.places)
}
export async function addNewPlace(requestData){
    const newPlace={
        title: requestData.placename,
        decription: requestData.description?requestData.description:'',
        address: requestData.address+", "+requestData.cityname+" - "
        +requestData.pincode+", "+requestData.statename+", "+requestData.country,
        creator:requestData.creator
    }
    // console.log(newPlace)
    const response=await fetch(`${backend_link}new`, {
        method: "post",
        body: JSON.stringify({
            title: newPlace.title,
            description: newPlace.description?newPlace.description:'',
            address: newPlace.address,
            creator: newPlace.creator
        }),
        headers: {
            "Content-Type":"application/json"
        }
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error.message)
    }
    const data=await response.json();
    // console.log(data)
    if(!data || data === null || !data.place || data.place === undefined || data.place === null){
        throw new Error("Unable to add this place. Please try again after sometimes")
    }
    return {newPlace: data.place}
}
export async function updatePlace(requestData){
    const id=requestData.id
    const updatedPlace={
        title: requestData.placename,
        description: requestData.description,
        address: requestData.address+", "+requestData.cityname+" - "
        +requestData.pincode+", "+requestData.statename+", "+requestData.country,
    }
    // console.log(id)
    // console.log(updatedPlace)
    const response=await fetch(`${backend_link}update/${id}`, {
        method: "post",
        crossorigin: true,
        body: JSON.stringify(updatedPlace),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error.message)
    }
    const data=await response.json()
    if(!data || data === null || !data.old || data.new){
        throw new Error("Unable to find or update this place. Please try again after sometimes")
    }if(data.new == data.old){
        throw new Error("Unable to update this place. Please try agian after sometimes")
    }
    // console.log(data.new)
    return ({oldPlace: data.old, newPlace: data.new})   
}
export async function deletePlace(requestData){
    const { id }=requestData
    const response=await fetch(`${backend_link}delete-place/${id}`, {
        method: "delete",        
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error.message)
    }
    const data=await response.json();
    if(!data || data === null || !data.message){
        throw new Error("Unable to delete this place")
    }
    return (data.message)
}
export async function uploadImage(file){
    const formData=new FormData();
    formData.append("image", file)
    const response=await fetch(`${backend_link}upload-image`, {
        method:"post",
        body: formData
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error)
    }
    const data=await response.json()
    if(!data){
        throw new Error("unable to upload image")
    }
    return (data)
}
export async function fetchImage(imagePath){
    if(!imagePath || typeof(imagePath) !== 'string' || imagePath.length<=0){
        throw new Error("Unable to fetch image")
    }
    // const image=imagePath.substring(imagePath.lastIndexOf('\\')+1)
    // console.log(image)
    const response=await fetch(`${backend_link}fetch-image?image=${imagePath}`)
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error)
    }
    console.log(response)
    if(!response){
        throw new Error("unable to upload image")
    }
    return response
=======
const auth_domain="https://identitytoolkit.googleapis.com/v1/accounts:";
const myapi="AIzaSyDu7T-C9LXeq_fZhGeVzszAro2hdSLONew";
const backend_link="https://combative-sunbonnet-crow.cyclic.app/";
// const backend_link="http://localhost:5000/"
console.log(process.env)
// const auth_domain=process.env.AUTH_DOMAIN
// const myapi=process.env.MY_API
// const backend_link=process.env.BACKEND_LINK
const FIREBASE_ERRORS={
    EMAIL_EXISTS: "The email address is already in use by another account.",
    OPERATION_NOT_ALLOWED: "Password sign-in is disabled for this project.",
    TOO_MANY_ATTEMPTS_TRY_LATER: "We have blocked all requests from this device due to unusual activity. Try again later.",
    EMAIL_NOT_FOUND: "There is no user record corresponding to this identifier. The user may have been deleted.",
    INVALID_PASSWORD: "The password is invalid or the user does not have a password.",
    USER_DISABLED: "The user account has been disabled by an administrator."
}
console.log(process.env)

export async function signUp(requestData){
    const email=requestData.email;
    const password=requestData.password;
    let response=await fetch(`${auth_domain}signUp?key=${myapi}`,{
        method:"post",
        body:JSON.stringify({
            email:email,
            password:password,
            returnSecureToken:true
        }),
        headers:{
            "Content-Type":"application/json"
        }
    })
    if(response.status !== 200 && response.status !== 201){
        let error="Request Failed! "||"Error Code : "||response.status;
        let errorcode=await response.json()
        if(errorcode && errorcode.error && errorcode.error.message){
            error=FIREBASE_ERRORS[errorcode.error.message]
        }
        throw new Error(error)
    }
    const data=await response.json();
    if(!data || !data.localId){
        throw new Error("Sorry... Signup Failed")
    }
    // console.log(requestData)
    const formData=new FormData()
    formData.append('name', requestData.firstname+" "+requestData.lastname)
    formData.append('username', requestData.username)
    formData.append('image', requestData.image)
    formData.append('emailId', email)
    formData.append('password', password)
    // console.log(formData)
    const response1=await fetch(`${backend_link}users/new`, {
        method: "post",
        body: formData
    })
    if(response1.status !== 200 && response1.status !== 201){
        const error=await response1.json()
        throw new Error(error.message)
    }
    const data1=await response1.json()
    if(data1.email !== data.email){
        throw new Error("Sorry... Signup Failed")
    }
    return {signUpInfo:data, userData: data1};
}
export async function signIn(requestData){
    const email=requestData.email;
    const password=requestData.password;
    let response=await fetch(`${auth_domain}signInWithPassword?key=${myapi}`,{
        method:"post",
        body:JSON.stringify({
            email:email,
            password:password,
            returnSecureToken:true
        }),
        headers:{
            "Content-Type":"application/json"
        }
    })
    if(response.status !== 200 && response.status !== 201){
        let error="Request Failed! "||"Error Code : "|| response.status
        const errorcode=await response.json();
        if(errorcode && errorcode.error && errorcode.error.message){
            error=FIREBASE_ERRORS[errorcode.error.message]
        }
        throw new Error(error)
    }
    const data=await response.json();
    if(!data || !data.localId){
        throw new Error("Unable to login")
    }
    const response1=await fetch(`${backend_link}sign-in`, {
        method: "post",
        body: JSON.stringify({
            emailId: email,
            password: password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if(response1.status !== 200 && response1.status !== 201){
        throw new Error("Request Failed! "||"Error Code: "||response1.status)
    }
    const data1=await response1.json()
    if(data1.email !== data.email){
        throw new Error("Unable to login")
    }
    return {loginInfo: data, userData: data1};
}
export async function getAllUsers(requestData){
    const query=requestData.params
    const params={
        page: new URLSearchParams(query).get("page"),
        limit: new URLSearchParams(query).get("limit")
    }
    if(Object.entries(params).find((e)=>{
        return (e[1] && (!parseInt(e[1]) || e[1] <= 0))}
        )){
        throw new Error("No User found for the given parameters")
    }
    const response=await fetch(`${backend_link}users${query}`, {
        method: "get",
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error.message)
    }
    const data=await response.json()
    // console.log(data)
    if(!data || data === null || !data.users || data.users.length <= 0){
        throw new Error("No User found")
    }
    data.users.map(async(user)=>{
        if(user.image){
            const image=await fetchImage(user.image)
            return {...user, image: image}
        }else{
            return user
        }
    })
    return ({...data.users})
}
export async function getUserByID(requestData){
    const { id }=requestData
    const response=await fetch(`${backend_link}user/${id}`, {
        method: "get",
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error.message)
    }
    const data=await response.json()
    // console.log(data)
    if(!data || data === null || !data.user){
        throw new Error("No User found for the given ID")
    }
    return (data.user)
}
export async function updateUser(requestData){
    const response=await fetch(`${backend_link}update-user/${requestData.id}`, {
        method: "patch",
        body: JSON.stringify({
            name: requestData.firstname+" "+requestData.lastname,
            username: requestData.username,
            emailId: requestData.email,
            password: requestData.password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error.message)
    }
    const data=await response.json()
    // console.log(data)
    if(!data || data === null || !data.updatedUser){
        throw new Error("Unable to update or fetch this User, please try after sometime")
    }
    return (data.updatedUser)
}
export async function deleteUser(requestData){
    const response=await fetch(`${backend_link}delete-user/${requestData.id}`, {
        method: "delete",
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error.message)
    }
    const data=await response.json()
    // console.log(data)
    if(!data || data === null || !data.deletedUser){
        throw new Error("Unable to delete this user, please try after sometime")
    }
    return (data.deletedUser)
}
export async function getAllPlaces(requestData){
    const query=requestData.params
    const params={
        page: new URLSearchParams(query).get("page"),
        limit: new URLSearchParams(query).get("limit")
    }
    if(Object.entries(params).find((e)=>{
        return (e[1] && (!parseInt(e[1]) || e[1] <= 0))}
        )){
        throw new Error("No Place found for the given parameters")
    }
    const response=await fetch(`${backend_link}places${query}`, {
        method: "get",
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error.message)
    }
    const data=await response.json()
    // console.log(data)
    if(!data || data === undefined || data === null){
        throw new Error("No Place found")
    }
    return (data)
}
export async function getPlaceByPlaceId(requestData){
    const { id }=requestData
    const response=await fetch(`${backend_link}place/${id}`, {
        method: "get"
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error.message)
    }
    const data=await response.json()
    if(!data || !data.place || data.place === null){
        throw new Error("No place found for the given ID")
    }
    return (data.place)
}
export async function getPlacesByUserId(requestData){
    const {id, params:query}=requestData
    const params={
        page: new URLSearchParams(query).get("page"),
        limit: new URLSearchParams(query).get("limit")
    }
    if(Object.entries(params).find((e)=>{
        return (e[1] && (!parseInt(e[1]) || e[1] <= 0))}
        )){
        throw new Error("No Place found for the given parameters")
    }
    const response=await fetch(`${backend_link}users/${id}${query}`, {
        method: "get",
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error.message)
    }
    const data=await response.json()
    if(!data || !data.places || data.places === null || data.places.length <= 0){
        throw new Error("No place found for the given parameters")
    }
    return (data.places)
}
export async function addNewPlace(requestData){
    const newPlace={
        title: requestData.placename,
        decription: requestData.description?requestData.description:'',
        address: requestData.address+", "+requestData.cityname+" - "
        +requestData.pincode+", "+requestData.statename+", "+requestData.country,
        creator:requestData.creator
    }
    // console.log(newPlace)
    const response=await fetch(`${backend_link}new`, {
        method: "post",
        body: JSON.stringify({
            title: newPlace.title,
            description: newPlace.description?newPlace.description:'',
            address: newPlace.address,
            creator: newPlace.creator
        }),
        headers: {
            "Content-Type":"application/json"
        }
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error.message)
    }
    const data=await response.json();
    // console.log(data)
    if(!data || data === null || !data.place || data.place === undefined || data.place === null){
        throw new Error("Unable to add this place. Please try again after sometimes")
    }
    return {newPlace: data.place}
}
export async function updatePlace(requestData){
    const id=requestData.id
    const updatedPlace={
        title: requestData.placename,
        description: requestData.description,
        address: requestData.address+", "+requestData.cityname+" - "
        +requestData.pincode+", "+requestData.statename+", "+requestData.country,
    }
    // console.log(id)
    // console.log(updatedPlace)
    const response=await fetch(`${backend_link}update/${id}`, {
        method: "post",
        crossorigin: true,
        body: JSON.stringify(updatedPlace),
        headers: {
            "Content-Type": "application/json"
        }
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error.message)
    }
    const data=await response.json()
    if(!data || data === null || !data.old || data.new){
        throw new Error("Unable to find or update this place. Please try again after sometimes")
    }if(data.new == data.old){
        throw new Error("Unable to update this place. Please try agian after sometimes")
    }
    // console.log(data.new)
    return ({oldPlace: data.old, newPlace: data.new})   
}
export async function deletePlace(requestData){
    const { id }=requestData
    const response=await fetch(`${backend_link}delete-place/${id}`, {
        method: "delete",        
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error.message)
    }
    const data=await response.json();
    if(!data || data === null || !data.message){
        throw new Error("Unable to delete this place")
    }
    return (data.message)
}
export async function uploadImage(file){
    const formData=new FormData();
    formData.append("image", file)
    const response=await fetch(`${backend_link}upload-image`, {
        method:"post",
        body: formData
    })
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error)
    }
    const data=await response.json()
    if(!data){
        throw new Error("unable to upload image")
    }
    return (data)
}
export async function fetchImage(imagePath){
    if(!imagePath || typeof(imagePath) !== 'string' || imagePath.length<=0){
        throw new Error("Unable to fetch image")
    }
    // const image=imagePath.substring(imagePath.lastIndexOf('\\')+1)
    // console.log(image)
    const response=await fetch(`${backend_link}fetch-image?image=${imagePath}`)
    if(response.status !== 200 && response.status !== 201){
        const error=await response.json()
        throw new Error(error)
    }
    console.log(response)
    if(!response){
        throw new Error("unable to upload image")
    }
    return response
>>>>>>> b2d305ed7b17da04bc48e631d42f0e92ca8594f6
}