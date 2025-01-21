import { HandCoinsIcon } from 'lucide-react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-10rem)] text-gray-500">
            <div className="text-center">
                <HandCoinsIcon className="size-20 text-orange-500 animate-bounce" />
            </div>
        </div>
    );
}

export default Loading;