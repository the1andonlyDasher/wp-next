import Image from "next/image";

export default function Avatar({ author }: any) {
  const isAuthorHaveFullName =
    author?.node?.firstName && author?.node?.lastName;
  const name = isAuthorHaveFullName
    ? `${author.node.firstName} ${author.node.lastName}`
    : author.node.name || null;

  return (
    <div className="flex items-center">
      <div className="w-10 h-10 relative mr-4">
        <Image
          src={"/user.svg"}
          fill
          className="rounded-full invert"
          alt={name}
        />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
}
