import { createBrowserRouter, Navigate } from "react-router-dom";
import { Main, Layout } from "@pages/index";
import { ROUTES } from "@/shared/lib/router-dom/routes";
import { Typography } from "simplify-dev";

export const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: ROUTES.GROUP,
        element: <Main />,
      },
      {
        path: ROUTES.TEACHER,
        element: <Main />,
      },

      {
        path: ROUTES.CLASSROOM,
        element: <Main />,
      },
      {
        path: ROUTES.EXAM,
        element: <Main />,
      },
      {
        path: `${ROUTES.GROUP}/:id`,
        element: <Main />,
      },
      {
        path: `${ROUTES.TEACHER}/:id`,
        element: <Main />,
      },

      {
        path: `${ROUTES.CLASSROOM}/:id`,
        element: <Main />,
      },
      {
        path: `${ROUTES.EXAM}/group/:id`,
        element: <Main />,
      },
      {
        path: `${ROUTES.EXAM}/teacher/:id`,
        element: <Main />,
      },
      {
        path: "*",
        element: (
          <Typography as="h2" className="text-center">
            Такой страницы не суцествует
          </Typography>
        ),
      },
      {
        path: "",
        element: <Navigate to={ROUTES.GROUP} replace />,
      },
    ],
  },
]);
