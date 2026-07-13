import { useEffect, useState } from "react";
import useAxios from "./axios/useAxios";

type UseCheckerProps =
  | {
      type: "project";
      title: string;
    }
  | {
      type: "endpoint";
      projectID: string;
      route: string;
    };

export function useChecker(props: UseCheckerProps) {
  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(false);

  const axios = useAxios();

  useEffect(() => {
    const check = async () => {
      setLoading(true);
      try {
        if (props.type === "project") {
          const res = await axios.get(
            `/check-duplicate?title=${encodeURIComponent(
              props.title,
            )}&type=${props.type}`,
          );

          setExists(res.data.exists);
        } else if (props.type === "endpoint") {
          const res = await axios.get(
            `/check-duplicate?projectID=${encodeURIComponent(
              props.projectID,
            )}&route=${encodeURIComponent(props.route)}&type=${props.type}`,
          );

          setExists(res.data.exists);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    check();
  }, [axios, props]);

  return {exists, loading}
}
