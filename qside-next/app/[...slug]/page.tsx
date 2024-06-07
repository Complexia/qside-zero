import Magic from "@/components/magic";




const ProfilePage = (context ) => {
   
    const username = context.params.slug[0]
    
    const category = context.searchParams.category;
    
    return (

       <Magic username={username} category={category}/> 

    )
}

export default ProfilePage