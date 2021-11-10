/* eslint-disable camelcase */
import challenge1Icon from '../assets/images/challenge-1-icon.svg';
import challenge1Icon_done from '../assets/images/challenge-1-done-icon.svg';
import challenge2Icon from '../assets/images/challenge-2-icon.svg';
import challenge2Icon_done from '../assets/images/challenge-2-done-icon.svg';
import challenge3Icon from '../assets/images/challenge-3-icon.svg';
import challenge3Icon_done from '../assets/images/challenge-3-done-icon.svg';
import challenge4Icon from '../assets/images/challenge-5-icon.svg';
import challenge4Icon_done from '../assets/images/challenge-5-done-icon.svg';
import challenge5Icon from '../assets/images/challenge-4-icon.svg';
import challenge5Icon_done from '../assets/images/challenge-4-done-icon.svg';
import challenge6Icon from '../assets/images/challenge-6-icon.svg';
import challenge6Icon_done from '../assets/images/challenge-6-done-icon.svg';
import challenge7Icon from '../assets/images/challenge-7-icon.svg';
import challenge7Icon_done from '../assets/images/challenge-7-done-icon.svg';
// import challenge8Icon from '../assets/images/challenge-8-icon.svg';
// import challenge8Icon_done from '../assets/images/challenge-8-done-icon.svg';
// import challenge9Icon from '../assets/images/challenge-9-icon.svg';
// import challenge9Icon_done from '../assets/images/challenge-9-done-icon.svg';

const indexedIcons = {
  icon_1: challenge1Icon,
  icon_1_done: challenge1Icon_done,
  icon_2: challenge2Icon,
  icon_2_done: challenge2Icon_done,
  icon_3: challenge3Icon,
  icon_3_done: challenge3Icon_done,
  icon_4: challenge4Icon,
  icon_4_done: challenge4Icon_done,
  icon_5: challenge5Icon,
  icon_5_done: challenge5Icon_done,
  icon_6: challenge6Icon,
  icon_6_done: challenge6Icon_done,
  icon_7: challenge7Icon,
  icon_7_done: challenge7Icon_done,
  icon_8: challenge5Icon,
  icon_8_done: challenge5Icon_done,
  icon_9: challenge6Icon,
  icon_9_done: challenge6Icon_done,
};

export default function selectChallengeIcon(number, isCompleted) {
  const property = isCompleted ? `icon_${number}_done` : `icon_${number}`;
  let selectedIcon = indexedIcons[property];

  if (!selectedIcon) {
    selectedIcon = isCompleted ? challenge1Icon_done : challenge1Icon;
  }

  return selectedIcon;
}
