import React, { useState, useEffect } from 'react';
import Layout from 'src/components/Layout/layout';
import Theme from 'src/assets/theme.svg';
import IceSeed from 'src/assets/Seeds/Ice.svg';
import ElectricSeed from 'src/assets/Seeds/electricity.svg';
import FireSeed from 'src/assets/Seeds/fire.svg';
import GrassSeed from 'src/assets/Seeds/grass.svg';
import WaterSeed from 'src/assets/Seeds/water.svg';
import StartIcon from 'src/assets/start_icon.svg';
import useChapters from 'src/hooks/use-chapters';
import { Link } from 'gatsby';
import BackLink from 'src/components/BackLink';
import {
  Container,
  ThemeContainer,
  StartLink,
  OverviewContainer,
} from 'src/PagesStyle/OverviewPage/styled';
import Completed from 'src/assets/completed.svg';
import { trackEvent } from 'src/utils/analytics';
import Footer from 'src/components/Footer';
import SEO from 'src/components/Seo';
import { PLANT_TYPES } from 'src/components/Plants/PLANT_TYPES';
import styled from '@emotion/styled';
import StyledLink from 'src/components/StyledLink';

function LessonsOverview() {
  const chapters = useChapters();
  const [chapterList, updateChapterList] = useState(chapters);
  const [plantType, setPlantTypeSeed] = useState(null);
  const [chapterZeroCompleted, setZeroChapterCompleted] = useState(() => {
    let result = false;
    const isChapterZeroCompleted =
      typeof window != 'undefined' && localStorage.getItem('chapter-0');
    if (isChapterZeroCompleted !== null) {
      result = isChapterZeroCompleted;
    }

    return result;
  });

  useEffect(() => {
    trackEvent('Chapters-Overview-View');
  }, []);

  useEffect(() => {
    //get the previous stored if available otherwise create a new one
    let list = [];
    const listJSON =
      typeof window != 'undefined' && localStorage.getItem('lesson-1');
    if (listJSON !== null) {
      list = JSON.parse(listJSON);
    }
    const newChapterList = chapters.map(chapter => {
      const chapterAlreadyExists = list.some(savedChapter => {
        return savedChapter.chapterSlug === chapter.slug;
      });
      return {
        title: chapter.title,
        chapter: chapter.chapter,
        slug: chapter.slug,
        excerpt: chapter.excerpt,
        completed: chapterAlreadyExists,
      };
    });

    updateChapterList(newChapterList);
  }, []);

  useEffect(() => {
    let plantType = null;
    const plantJSON =
      typeof window != 'undefined' && localStorage.getItem('plant');
    if (plantJSON !== null) {
      plantType = JSON.parse(plantJSON).type;
    }
    setPlantTypeSeed(plantType);
  }, []);

  const renderPlantTypeSeed = (plantType = null) => {
    switch (plantType) {
      case PLANT_TYPES.ICE:
        return <IceSeed />;
      case PLANT_TYPES.ELECTRIC:
        return <ElectricSeed />;
      case PLANT_TYPES.GRASS:
        return <GrassSeed />;
      case PLANT_TYPES.WATER:
        return <WaterSeed />;
      case PLANT_TYPES.FIRE:
        return <FireSeed />;
      default:
        return null;
    }
  };
  return (
    <Layout
      background={`radial-gradient(
        198.67% 198.67% at 53.06% -50.22%,
        #13282d 53.32%,
        #296460 100%
      )
      no-repeat center center fixed`}
    >
      <SEO title="Chapters Overview" />
      <Container>
        <div>
          <BackLink to="/tezos" />
        </div>
        <ThemeContainer>
          <Theme />
        </ThemeContainer>
        <OverviewContainer>
          <div>
            <h1>The Challenge Begins</h1>
            <p>
              In Lesson 1, you're going to growing your plant to fight against
              upcoming zombie apocalypse at end of the lesson.
            </p>
            <p>
              A zombie apocalypse has begun. You’ve luckily found the seed of a
              plant that is known to stop zombies. Your task is to incubate the
              seed and help it evolve before the zombies reach you. In the
              lesson, you’re going to learn how to evolve your plant and train
              it to defend against the incoming apocalypse by building a simple
              smart contract in SmartPy which can be deployed on tezos
              blockchain.
            </p>
            <div>
              <StyledLink
                style={{ padding: '15px 35px' }}
                to="/tezos/storyline"
              >
                Start Lesson
              </StyledLink>
            </div>
          </div>
          <div>
            <div>
              <h2>Chapters</h2>
              <StartLink to="/tezos/storyline">
                <StartIcon />
              </StartLink>
            </div>
            <ul>
              <li>
                <Link to={`/tezos/storyline`}>
                  {chapterZeroCompleted ? (
                    <Completed width="38" height="38" />
                  ) : null}
                  Chapter 0 - Zombie Apocalypse Begins
                </Link>
                <hr />
              </li>
              {chapterList.map((chapter, index) => {
                return (
                  <li key={index}>
                    <Link to={`/lesson/${chapter.slug}`}>
                      {chapter.completed ? (
                        <Completed width="38" height="38" />
                      ) : null}{' '}
                      {chapter.chapter} - {chapter.title}
                    </Link>
                    <hr />
                  </li>
                );
              })}
            </ul>
          </div>
        </OverviewContainer>
      </Container>
      <Footer />
    </Layout>
  );
}

const StartLessonLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  border: 5px solid rgba(41, 203, 106, 0.41);
  background: #29cb6a;
  border-radius: 7px;
  width: 187px;
  height: 74px;

  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 97.69%;
  /* identical to box height, or 20px */
  color: #ffffff;
  transition: 0.3s;
  cursor: pointer;

  margin: 3rem auto 3rem auto;

  :hover {
    box-shadow: 0 0 0 0.25rem rgba(41, 203, 106, 0.2);
  }
`;

export default LessonsOverview;