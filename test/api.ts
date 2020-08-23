export interface Post {
    id: number;
    title: string;
}

export interface User {
  id: number;
  name: string;
}

export const fetchPosts = () => Promise.resolve<Post[]>([{
  id: 1,
  title: 'First post',
}, {
  id: 2,
  title: 'Second post',
}]);

export const fetchUser = () => Promise.resolve({
  id: 1,
  name: 'John Doe',
});
