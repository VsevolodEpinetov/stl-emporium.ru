import Head from 'next/head'
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { useMemo, useState, createRef, useEffect } from 'react'
import { CreatureCard } from '@/components/CreatureCard'
import { MultiSelect, Navbar, Checkbox, SimpleGrid, Image, Button, UnstyledButton, Group, ThemeIcon, Text, Divider, SelectChevronIcon, Center } from '@mantine/core'
import { IconAlertCircle, IconDatabase, IconGitPullRequest, IconMessages } from '@tabler/icons-react'
const DATA = require("../../data/miniatures.json")
const FILTERS = require("../../data/filters.json")

function MainLink({ icon, color, label }) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const testButtons = [
  { icon: <IconGitPullRequest size={16} />, color: 'blue', label: 'Выбор героя' },
  { icon: <IconAlertCircle size={16} />, color: 'teal', label: 'Конструктор кампании' },
  { icon: <IconMessages size={16} />, color: 'violet', label: 'Где распечатать?' },
  { icon: <IconDatabase size={16} />, color: 'grape', label: `Корзина` }
];

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [chosenCreatures, setChosenCreatures] = useLocalStorage({ key: 'chosen-creatures', defaultValue: [] });

  const races = FILTERS.races;
  const classes = FILTERS.classes;

  const [atLeast1Visible, handleAtLeast1Visible] = useDisclosure(true);
  const [selectedRaces, setSelectedRaces] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSexes, setSelectedSexes] = useState([]);
  const [miniatures, setMiniatures] = useState(DATA); 1

  useEffect(
    () => {
      handleAtLeast1Visible.open();
      let counter = 0;
      let copy = [...miniatures];
      copy = copy.map(creature => ({ ...creature, opacity: 100 }))

      if (selectedRaces.length > 0) {
        copy = copy.map(creature => {
          if (selectedRaces.indexOf(creature.race) < 0) {
            return { ...creature, opacity: 0 }
          } else {
            return { ...creature }
          }
        })
      }

      if (selectedSexes.length > 0) {
        copy = copy.map(creature => {
          if (selectedSexes.indexOf(creature.sex) < 0) {
            return { ...creature, opacity: 0 }
          } else {
            return { ...creature }
          }
        })
      }

      if (selectedClasses.length > 0) {
        copy = copy.map(creature => {
          let found;
          for (let i = 0; i < creature.classes.length; i++) {
            if (selectedClasses.indexOf(creature.classes[i]) > -1) {
              found = true;
              break;
            }
          }

          if (!found) {
            return { ...creature, opacity: 0 }
          }
          else {
            handleAtLeast1Visible.open();
            return { ...creature }
          }
        })
      }


      if (copy.filter(creature => creature.opacity > 0).length < 1)
        handleAtLeast1Visible.close();

      setMiniatures(copy);
    },
    [selectedRaces, selectedClasses, selectedSexes]
  )

  function addACreatureToACart(creature) {
    setChosenCreatures([
      ...chosenCreatures,
      creature
    ])
  }

  function removeACreatureFromACart(creature) {
    let index = -1;
    for (let i = 0; i < chosenCreatures.length; i++) {
      if (creature.path == chosenCreatures[i].path) {
        index = i;
        break;
      }
    }
    setChosenCreatures([...chosenCreatures.slice(0, index), ...chosenCreatures.slice(index + 1)])
    console.log(index)
  }

  function getAllInstancesOfCreatureInACart(creature) {
    let counter = 0;

    for (let i = 0; i < chosenCreatures.length; i++) {
      if (creature.path === chosenCreatures[i].path) counter++;
    }

    return counter;
  }

  return (
    <>
      <Head />
      <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
        <Navbar.Section><Image src="/logo.png" alt='logo'></Image></Navbar.Section>
        <Navbar.Section grow mt="md">

          <Divider />

          <MainLink icon={<IconGitPullRequest size={16} />} color={'blue'} label={'Выбор героя'} />
          <MainLink icon={<IconGitPullRequest size={16} />} color={'teal'} label={'Конструктор кампании'} />
          <MainLink icon={<IconGitPullRequest size={16} />} color={'violet'} label={`Корзина (${chosenCreatures.length})`} />

          <Divider />

          <MultiSelect
            value={selectedRaces}
            onChange={setSelectedRaces}
            data={races}
            placeholder="Показываются все расы"
            searchable
            nothingFound="Таких рас нет :("
            label="Фильтр по расам"
          />
          <MultiSelect
            value={selectedClasses}
            onChange={setSelectedClasses}
            data={classes}
            placeholder="Показываются все классы"
            searchable
            nothingFound="Не знаем таких классов :("
            label="Фильтр по классам"
          />

          <Checkbox.Group
            value={selectedSexes}
            onChange={setSelectedSexes}
            label="Фильтр по полу"
          >
            <Checkbox value="m" label="Мужской" />
            <Checkbox value="f" label="Женский" />
            <Checkbox value="x" label="???" />
          </Checkbox.Group>
        </Navbar.Section>
        <Navbar.Section>О нас</Navbar.Section>
      </Navbar>
      <main>
        <SimpleGrid
          cols={4}
          spacing="lg"
          breakpoints={[
            { maxWidth: 'md', cols: 3, spacing: 'md' },
            { maxWidth: 'sm', cols: 2, spacing: 'sm' },
            { maxWidth: 'xs', cols: 1, spacing: 'sm' },
          ]}
        >
          {atLeast1Visible > 0
            ?
            miniatures.map(creature => <CreatureCard creatureData={creature} key={`card-${creature.path}`} isInCart={getAllInstancesOfCreatureInACart(creature)} addACreatureToACart={addACreatureToACart} removeACreatureFromACart={removeACreatureFromACart} />)
            :
            <Group>
              Нет фигурок по таким фильтрам!
              <Image
                src="dude.svg"
                alt="Shrug dude"
              />
            </Group>
          }
        </SimpleGrid>
      </main>
    </>
  )
}
