interface Credentials {
    email: string,
    name: string
};

interface comments {
    text: string,
    date: Date
};

function MyPortal() {

    let comments = sessionStorage.getItem('userComments');
    let userCredentials = sessionStorage.getItem('userCredentials');
    let parsedCredentials: Credentials = JSON.parse(userCredentials as string);
    let parsedComments: comments[] = JSON.parse(comments as string);

    return (
        <div>
        </div>
    )
};

export default MyPortal;