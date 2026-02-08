import { motion } from 'framer-motion';

interface ExperienceCardProps {
    id: string;
    title: string;
    image: string;
    isSelected?: boolean;
    onClick: () => void;
}

export const ExperienceCard = ({ title, image, isSelected = false, onClick }: ExperienceCardProps) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`relative h-64 w-full rounded-2xl overflow-hidden shadow-lg group focus:outline-none ring-offset-2 focus:ring-2 ${isSelected ? 'ring-brand-600' : 'ring-transparent'
                }`}
        >
            <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity ${isSelected ? 'opacity-90' : 'opacity-70 group-hover:opacity-80'
                }`} />

            <div className="absolute bottom-0 left-0 p-4 md:p-6 text-left">
                <h3 className="text-white text-lg md:text-xl font-bold tracking-wide">{title}</h3>
                {isSelected && (
                    <motion.div
                        layoutId="active-indicator"
                        className="h-1 w-8 bg-brand-400 mt-2 rounded-full"
                    />
                )}
            </div>
        </motion.button>
    );
};
