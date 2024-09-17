'use client';

import { SignInButton, SignOutButton, useSession } from '@clerk/nextjs';

import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { createThumbnail } from '../convex/thumbnails';

export default function Home() {
  const { isSignedIn } = useSession();

  const createThumbnail = useMutation(api.thumbnails.createThumbnail);

  const thumbnails = useQuery(api.thumbnails.getThumbnailsForUser);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;

    await createThumbnail({ title });
    e.target.reset();
  };

  return (
    <main>
      {!isSignedIn ? <SignInButton /> : <SignOutButton />}

      {isSignedIn && (
        <form onSubmit={submitHandler}>
          <label htmlFor="title">Title</label>
          <input
            className="shadow appearance-none border rounded w-max-2xl py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
          />

          <button type="submit">Create</button>
        </form>
      )}
      {thumbnails?.map((thumbnail) => (
        <div key={thumbnail._id}>{thumbnail.title}</div>
      ))}
    </main>
  );
}
