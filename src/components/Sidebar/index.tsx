import { FunctionComponent, Fragment } from 'react';
import { Card, List, ListItem, ListItemPrefix } from '@material-tailwind/react';
import { ListNav } from '../../router/sitemap';
import { Link } from 'react-router-dom';

const Sidebars: FunctionComponent = () => {
  const navMain = ListNav.filter((v) => v.main);
  const navNoMain = ListNav.filter((v) => !v.main);

  return (
    <Fragment>
      <Card className="h-[calc(100vh-4rem)] w-full max-w-[17rem] p-6 rounded-none shadow-sm">
        <List>
          {
            <>
              {navMain.map((v, i) => {
                const IconComponent = v.icons;
                return (
                  <Link to={v.tolink as string} key={i}>
                    <ListItem key={i}>
                      <ListItemPrefix>
                        <IconComponent className="h-5 w-5" />
                      </ListItemPrefix>
                      {v.name}
                    </ListItem>
                  </Link>
                );
              })}
              <hr className="my-2 border-blue-gray-50" />
              {navNoMain.map((v, i) => {
                const IconComponent = v.icons;
                return (
                  <Link to={v.tolink as string} key={i}>
                    <ListItem key={i}>
                      <ListItemPrefix>
                        <IconComponent className="h-5 w-5" />
                      </ListItemPrefix>
                      {v.name}
                    </ListItem>
                  </Link>
                );
              })}
            </>
          }
        </List>
      </Card>
    </Fragment>
  );
};

export default Sidebars;
