import { type User } from "next-auth";
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { type AvatarProps } from "@radix-ui/react-avatar";

// Propsインターフェースは、AvatarPropsを継承し、userプロパティを追加したもの
interface Props extends AvatarProps {
// Pickメソッド: Userオブジェクトから指定されたプロパティ("name"と "image")を選択。
  user: Pick<User, "name" | "image">;// ユーザーオブジェクトから"名前"と "画像"プロパティを選択
}

const UserAvatar = ({ user, ...props }: Props) => {
  return (
    <Avatar {...props}>
      {user.image ? ( // ユーザーの画像が存在する場合
       // 画像を表示するコンテナー
        <div className="relative w-full h-full aspect-square">
          <Image
            fill
            src={user.image}// ユーザーの画像を表示
            alt="profile picture"// 画像の代替テキスト
            referrerPolicy="no-referrer" // referrer情報を含まないように設定
          />
        </div>
      ) : (
         // ユーザーの画像が存在しない場合
        <AvatarFallback>
          <span className="sr-only ">{user?.name}</span>{/* ユーザー名を表示 */}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar; 


