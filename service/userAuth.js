const sessionIdToUserMap=new Map();

function setUser(id,user){
    console.log(`setUser ${user}`)
    sessionIdToUserMap.set(id,user)
}

function getUser(id){
    console.log(sessionIdToUserMap.get(id))
    return sessionIdToUserMap.get(id);
}


module.exports={
    getUser,setUser
}