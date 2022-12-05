export type AlbumDto = {
    id: number;
  
    name: string;
  
    author: string;
  
    year: number;
  
    image_url: string;
  
    createdAt?: Date
  
    updatedAt?: Date
  
    deletedAt?: Date;
}

export type CreateAlbumDto = {
    id?: number;
    
    name: string;
  
    author: string;
  
    year: number;
  
    image_url: string;
}