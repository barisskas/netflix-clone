import axios from "axios";
import React, { useCallback, useMemo } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";
import { mutate } from "swr";

interface Props {
  movieId: string;
}

const FavoriteButton: React.FC<Props> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    console.log(currentUser);
    console.log(list, movieId);

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorite = useCallback(async () => {
    let response;
    if (isFavorite) {
      response = await axios.delete("/api/favorite", { data: { movieId } });
    } else {
      response = await axios.post(`/api/favorite`, { movieId });
    }

    const updatedFavoriteIds = response?.data?.favorites;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });

    mutateFavorites();
  }, [isFavorite, movieId, mutate, mutateFavorites, currentUser]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h10 border-white border-2 rounded-full flex justify-center items-center transtion hover:border-neutral-300 "
      onClick={toggleFavorite}
    >
      <Icon className={`text-white transition `} size={25} />
    </div>
  );
};
export default FavoriteButton;
