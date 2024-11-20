import FakeTerminalWindow from '../components/about/FakeTerminalWindow';
import Prompt from '../components/about/Prompt';
import { skills } from '../../lib/constants';

const SkillList = ({ title, items }: { title: string, items: string[] }) => (
  <>
    <li className="text-secondary font-semibold">{title}/</li>
    {items.map((item, index) => <li key={index}>{item}</li>)}
  </>
);

const About = () => {
  return (
    <div className="space-y-10 my-10 break-words">
      {/* general bio */}
      <FakeTerminalWindow>
        <Prompt content="cd about/" />
        <Prompt directory="/about" branch={true} content="cat README.md" />
        <p>Hello there! I'm Bidyadhar, a cloud developer from India, passionate about leveraging cutting-edge technologies like AWS and blockchain to build innovative solutions I specialize in cloud development and have a strong interest in blockchain.With a knack for adaptability and a keen eye for detail, I am always looking to expand my skill set. While I am proficient in Python, Solidity, and working with AWS services, I am actively exploring Chainlink, Remix, and other tools to enhance my blockchain expertise. I enjoy crafting solutions that make a tangible impact, like my recent healthcare app for rural communities and blockchain-based carpooling system.</p>
      </FakeTerminalWindow>

      {/* skills & tools */}
      <FakeTerminalWindow>
        <Prompt content="cd skillsAndTools/Proficient" />
        <Prompt directory='/skillsAndTools/Proficient' branch={true} content="ls" />
        <div className='flex justify-start flex-wrap md:justify-between'>
          <ul>
            <SkillList title="technology" items={skills.theObvious} />
            <SkillList title="tools" items={skills.toolsOfTheTrade} />
          </ul>
        </div>
      </FakeTerminalWindow>

      {/* hobbies / interests */}
      <FakeTerminalWindow>
        <Prompt content="cd HobbiesAndInterests/" />
        <Prompt directory='/HobbiesAndInterests' branch={true} content="ls" />
        <ul>
          <li>🎨 painting</li>
          <li>🎬 movies</li>
          <li>👨‍💻 blockchain experiments</li>
          <li>🌿 exploring nature</li>
          <li>📚 tech blogs</li>
        </ul>
      </FakeTerminalWindow>
    </div>
  );
}

export default About;
