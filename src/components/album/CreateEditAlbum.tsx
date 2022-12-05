import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormGroup, Input, Label, Message } from "../Form";
import { CreateAlbumDto } from "./dtos/album.dto";

const CreateEditAlbum = () => {
    const navigate = useNavigate();
    let { albumId } = useParams();
    const [showLimit, setshowLimit] = useState(false)
    const [album, setalbum] = useState<any>()

    const editing = albumId && Number(albumId) !== 0;
    useEffect(() => {
        if (editing) {
            getAlbum(Number(albumId));
        }
    }, []);

    const getAlbum = async (id: number) => {
        try {
            const res = await axios.get(process.env.REACT_APP_API_URL + `/album/${id}`);
            setalbum(res.data)
        } catch (error) {
            console.log(error);

        }
    }

    const submit = async () => {
        try {
            let res;
            if (editing) {
                res = await axios.patch(process.env.REACT_APP_API_URL + `/album/${album.id}`, album);
            } else {
                res = await axios.post(process.env.REACT_APP_API_URL + `/album`, album);
            }
            navigate('/')

        } catch (error: any) {
            console.log(error);
            if (error.response.data.message === 'album limit reached') {
                setshowLimit(true)
            }
        }
    }

    return (
        <>
            <FormGroup>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={album?.name}
                    onChange={(e) => setalbum({ ...album, name: e.target.value })} />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="author">Author</Label>
                <Input
                    id="author"
                    value={album?.author}
                    onChange={(e) => setalbum({ ...album, author: e.target.value })} />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="image_url">Image</Label>
                <Input
                    id="image_url"
                    value={album?.image_url}
                    onChange={(e) => setalbum({ ...album, image_url: e.target.value })} />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="image_url">Year</Label>
                <Input
                    id="image_url"
                    value={album?.year}
                    onChange={(e) => setalbum({ ...album, year: e.target.value })} />
            </FormGroup>
            {showLimit ? <Message>Album Limit Reached.</Message> : <></>}
            <FormGroup>
                <Button onClick={() => navigate('/')}>Cancel</Button>
                <Button onClick={() => submit()}>{editing ? "Edit" : "Create"}</Button>
            </FormGroup>
        </>
    )
}

export default CreateEditAlbum;