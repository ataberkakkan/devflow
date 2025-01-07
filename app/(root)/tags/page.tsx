import { getTags } from "@/lib/actions/tag.action";

const Tags = async () => {
  const { success, data, error } = await getTags({
    page: 1,
    pageSize: 10,
  });

  const { tags } = data || {};

  return <div>Tags</div>;
};
export default Tags;
