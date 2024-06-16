import { SKELETON_COUNT } from '../../../utils/constants';

type ListSkeletonProps = {
  Child: React.ComponentType;
};

function ListSkeleton({ Child }: ListSkeletonProps) {
  return (
    <>
      {[...Array(SKELETON_COUNT)].map((_, index) => (
        <Child key={index} />
      ))}
    </>
  );
}

export default ListSkeleton;
