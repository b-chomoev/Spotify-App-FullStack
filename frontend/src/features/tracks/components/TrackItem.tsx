import Grid from '@mui/material/Grid2';
import { Card, CardContent, CardHeader } from '@mui/material';
import * as React from 'react';

interface Props {
  name: string;
  duration: number;
  number: number;
}

const ProductItem: React.FC<Props> = ({name, duration, number}) => {

  return (
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
      <Card>
        <CardHeader title={name}/>
        <CardContent>
          <p><strong>Duration:</strong> {duration}</p>
          <p><strong>Track Order:</strong> {number}</p>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductItem;