export interface IFile {
   url: string
}

export interface IDocumentPickerFile {
   name: string;
   size?: number | undefined;
   uri: string;
   mimeType?: string | undefined;
   lastModified?: number | undefined;
   file?: File | undefined;
}

export interface IImagePickerAsset {
   uri: string;
   assetId?: string | null;
   width: number;
   height: number;
   type?: 'image' | 'video';
   fileName?: string | null;
   fileSize?: number;
   exif?: Record<string, any> | null;
   base64?: string | null;
   duration?: number | null;
   mimeType?: string;
}

export interface IMulterFile {
   fieldname: string;
   originalname: string;
   encoding: string;
   mimetype: string;
   size: number;
   destination: string;
   filename: string;
   path: string;
   buffer: Buffer;
}