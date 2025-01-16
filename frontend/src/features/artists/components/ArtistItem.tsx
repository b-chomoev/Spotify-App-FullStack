import Grid from '@mui/material/Grid2';
import { Card, CardActions, CardHeader, CardMedia, IconButton } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import * as React from 'react';
import noPicture from '../../../assets/no-picture.png';
import { apiUrl } from '../../../globalConstants.ts';

interface Props {
  name: string;
  id: string;
  image?: string | null | undefined;
}

const ProductItem: React.FC<Props> = ({name, id, image}) => {
  let productImage = noPicture;

  if (image) {
    productImage = apiUrl + '/' + image;
  }

  return (
    <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
      <Card>
        <CardHeader title={name}/>
        <CardMedia sx={{width: '100%', aspectRatio: '16/9',}} title={name} src={productImage} component='img'/>
        <CardActions>
          <IconButton component={Link} to={`/albums?artist=${id}`}>
            <ArrowForward/>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductItem;