export interface UserProps {
    isLogin: boolean;
    nickName?: string;
    _id?: string;
    column?: string;
    email?: string;
    description?: string;
    avatar?: string;
}

export interface ImageProps {
    _id?: string;
    url?: string;
    fitUrl?: string;
    createdAt?: string;
}

export interface ColumnProps {
    _id?: string;
    url?: string;
    fitUrl?: string;
    createdAt?: string;
}

export interface PostProps {
    _id?: string;
    title: string;
    excerpt?: string;
    content?: string;
    image?: string | ImageProps;
    column: string;
    author?: string | UserProps;
    createdAt?: string;
    isHTML?: boolean;

}

export interface RuleProps {
    type: 'required' | 'email' | 'custom';
    message: string;
    validator?: () => boolean;
}

export type MessageType = 'success' | 'error' | 'default'

export interface ResponseType<p = {}> {
    code: number;
    msg: string;
    data: p;
}

export interface GloabalErrorProps {
    status: boolean;
    message?: string;

}

interface listProps<p> {
    [id: string]: p;
}

export interface LoadedPostProps {
    columnId?: string;
    currentPage?: number;
    total?: number;
}

export interface GloadDataProps {
    token: string;
    error: GloabalErrorProps;
    loading: boolean;
    columns: {
        data: listProps<ColumnProps>;
        currentPage: number;
        total: number;
    };
    posts: {
        data: listProps<PostProps>;
        loadedColumns: listProps<LoadedPostProps>;
    };
    user: UserProps;
}