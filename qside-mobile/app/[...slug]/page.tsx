import Magic from "@/components/magic";


const ProfilePage = ({ params }: { params: { slug: string } }) => {
    const username = params.slug[0];
    console.log(username)
    return (

       <Magic username={username} /> 

    )
}

export default ProfilePage