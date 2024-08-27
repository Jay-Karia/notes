import { Button } from "./ui/button";

type Props = {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
};

export default function EditToggle({ isEditing, setIsEditing }: Props) {
  return (
    <>
      {isEditing ? (
        <div className="flex gap-4">
          <Button
            variant={"secondary"}
            onClick={() => {
              setIsEditing(false);
            }}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button variant={"primary"} onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      )}
    </>
  );
}
