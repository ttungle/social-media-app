import { Feed } from '@/components/common/feed';
import { CreatePost } from '@/components/create-post';

export interface HomePageProps {}

const user = {
  email: 'thanhtungle@gmail.com',
  username: 'Fan Page',
  profilePicture: 'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
};

const posts = [
  {
    id: 1,
    description: 'This is description 1',
    images: [
      'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
      'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
      'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
      'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
      'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
      'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
      'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
      'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
      'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
    ],
    likes: ['123', '123'],
  },
  {
    id: 2,
    description: 'This is description 1',
    images: [
      'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
      'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
      'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
    ],
    likes: ['123', '123'],
  },
  {
    id: 3,
    description: 'This is description 1',
    images: [
      'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
      'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
      'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
      'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
    ],
    likes: ['123', '123'],
  },
  {
    id: 4,
    description: 'This is description 1',
    images: [
      'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
      'https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg',
    ],
    likes: ['123', '123'],
  },
  {
    id: 5,
    description: 'This is description 1',
    images: ['https://demoda.vn/wp-content/uploads/2022/04/avatar-facebook-dep.jpg'],
    likes: ['123', '123'],
  },
];

export function HomePage(props: HomePageProps) {
  return (
    <>
      <CreatePost user={user} />
      {posts.map((post, index) => (
        <Feed key={post.id} user={user} {...post} post={post} />
      ))}
    </>
  );
}
