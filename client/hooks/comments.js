import useSWR from "swr";
import { useOutletContext } from "react-router";
import { getComments } from "@handlers/comments";

export const useComments = (pid, shouldFetch = false) => {
  const product = useOutletContext();
  return useSWR(product && pid ? `${pid}/comments` : null, async () =>
    shouldFetch
      ? getComments(pid)
      : product.comments.filter(Boolean)
  );
}