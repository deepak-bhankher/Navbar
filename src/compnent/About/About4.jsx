import { motion } from "framer-motion";

const teamMembers = [
  {
    id: 1,
    image: "/team1.jpg",
    name: "Arif Raihan",
    role: "Lead Editor",
    description:
      "Creates viral short-form videos with cinematic storytelling and smooth motion graphics.",
  },
  {
    id: 2,
    image: "/team2.jpg",
    name: "Tanvir Ahmed",
    role: "Creative Director",
    description:
      "Turns simple ideas into high-converting social media content loved by brands.",
  },
  {
    id: 3,
    image: "/team3.jpg",
    name: "Abdul Qadir",
    role: "Client Success",
    description:
      "Keeps every project on track while making sure clients are always happy.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 80 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

function TeamCard({ member }) {
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -12 }}
      transition={{ duration: 0.35 }}
      className="group bg-[#F4F2ED] rounded-[34px] overflow-hidden shadow-sm hover:shadow-2xl duration-500"
    >
      <div className="overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6 }}
          src={member.image}
          alt={member.name}
          className="w-full h-[420px] object-cover"
        />
      </div>

      <div className="p-7">
        <h2 className="text-2xl font-bold text-[#15140F]">{member.name}</h2>
        <span className="inline-block mt-3 border border-black/20 px-3 py-1 text-xs font-semibold tracking-wide rounded-md text-black/70 group-hover:bg-black group-hover:text-[#D6ff01] group-hover:border-black transition-all duration-300">
          {member.role}
        </span>
        <p className="text-black/60 leading-7 mt-4">{member.description}</p>
      </div>
    </motion.div>
  );
}

function About4() {
  return (
    <section className=" py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto text-center mb-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center"
        >
          <span className="border border-black  px-3 py-1 text-xs sm:text-sm font-semibold tracking-wide rounded-md hover:text-[#D6ff01] text-black hover:bg-black  transition-all duration-300 cursor-pointer">
            TEAM
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-3xl mt-5 md:text-4xl lg:text-5xl font-bold text-white"
        >
          Meet the team
        </motion.h2>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
      >
        {teamMembers.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </motion.div>
    </section>
  );
}

export default About4;
