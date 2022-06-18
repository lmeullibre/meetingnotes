import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import { ParticipantStats } from './types/meeting';
import { FC, useEffect, useState } from 'react';


interface ParticipantPieProps {
  participants: ParticipantStats[];
}

const ParticipantPie: FC<ParticipantPieProps> = ({
  participants

}) => {
  const theme = useTheme();
  const [othersScore, setOthersScore] = useState<number>(0);
  const [length, setLength] = useState<number>(0)

  const computeTotalLength = () => {
    for (let participant of participants) {
      setLength(length + participant.minutes)
    }
  }

  const gangang = (): number[] => {
    let numbers = []
    for (let participant of participants) {
       numbers.push(participant.minutes)
    }
    numbers.push(othersScore)
    return numbers
  }

  const getNames = (): string[] => {
    let names = []
    for (let participant of participants) {
       names.push(participant.participantName.toLocaleLowerCase())

    }
    names.push("Other participants")
    return names
  }

  const getColors = (): string[] => {
    let colors = []
    var randomColor = require('randomcolor'); // import the script
    for (let participant of participants) {
       colors.push(randomColor())
    }
    colors.push(randomColor())
    return colors
  }

  const data = {
    datasets: [
      {
        data: gangang(),
        backgroundColor: getColors(),
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: getNames()
  }; 

  const options = {
    animation: true,
    animationSteps: 100,
    animationEasing: "easeOutBounce",
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: true
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Erald',
      value: 63,
      icon: LaptopMacIcon,
      color: '#3F51B5'
    },
    {
      title: 'Stefano',
      value: 15,
      icon: TabletIcon,
      color: '#E53935'
    },
    {
      title: 'Sergi',
      value: 23,
      icon: PhoneIcon,
      color: '#FB8C00'
    }
  ];

  useEffect(() => {
  }, []);

  return (
    <Card>
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
          />
        </Box>
        
      </CardContent>
    </Card>
  );
};

export default ParticipantPie;
