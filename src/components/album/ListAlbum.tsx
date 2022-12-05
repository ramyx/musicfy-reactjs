import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../Form';
import Table from '../Table';
import { AlbumDto } from './dtos/album.dto';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Image = styled.img`
    height: 80px;
    width: 80px;
`

// const Button = styled.button`
//   background:  "palevioletred";
//   color: "white" ;

//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border: 2px solid palevioletred;
//   border-radius: 3px;
// `

const ListAlbum = () => {
    const navigate = useNavigate();
    const [albums, setalbums] = useState();
    useEffect(() => {
        getAlbums();
    }, []);

    const getAlbums = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + `/album`);
            setalbums(response.data.map((a: AlbumDto) => {
                delete a.createdAt;
                delete a.updatedAt;
                delete a.deletedAt;
                return {
                    ...a,
                    image_url: <Image src={`./images/${a.image_url}`}></Image>,
                    actions: <>
                        <Button onClick={() => navigate(`/create/${a.id}`)}>edit</Button>
                        <Button onClick={() => deleteAlbum(a.id)}>delete</Button>
                    </>
                }
            }));
        } catch (error) {
            console.log(error);
        }
    }

    const deleteAlbum = async (id: number) => {
        try {
            const response = await axios.delete(process.env.REACT_APP_API_URL + `/album/${id}`);
            await getAlbums()
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <Wrapper>
            {albums ? <Table data={albums}></Table> : <></>}
            <Button onClick={() => navigate('create/0')}>Add</Button>
        </Wrapper>
    )
}

export default ListAlbum;