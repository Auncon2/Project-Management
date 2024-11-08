import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import ProjectManagementCard from "../components/ProjectManagementCard";

type Column = {
  id: number;
  title: string;
  taskIds: number[];
};

type Task = {
  id: number;
  content: string;
  photo: any;
  name: string;
  email: string;
  col_id: number;
};

const initialColumns: Column[] = [
  {
    id: 12,
    title: "To Do",
    taskIds: [
      240, 194, 184, 174, 164, 145, 144, 413, 124, 114, 140, 29, 83, 77,
    ],
  },
  { id: 34, title: "In Progress", taskIds: [55] },
  { id: 56, title: "Review", taskIds: [] },
  { id: 78, title: "Testing", taskIds: [] },
  { id: 90, title: "Done", taskIds: [4, 33] },
  { id: 65, title: "Back Log", taskIds: [] },
];

const initialTasks: Task[] = [
  {
    id: 3,
    photo: undefined,
    name: "fddasasdas",
    email: "asas@gmail.com",
    content: "Complete front-end layout design",
    col_id: 34,
  },
  {
    id: 25,
    photo: undefined,
    name: "fddasasdas",
    email: "asas@gmail.com",
    content: "Refactor API integration",
    col_id: 34,
  },
  {
    id: 33,
    photo: undefined,
    name: "fddasasdas",
    email: "asas@gmail.com",
    content: "Write unit tests for components",
    col_id: 12,
  },
  {
    id: 4,
    photo: undefined,
    name: "fddasasdas",
    email: "asas@gmail.com",
    content: "Implement user authentication",
    col_id: 90,
  },
  {
    id: 55,
    photo: undefined,
    name: "fddasasdas",
    email: "bsas@gmail.com",
    content: "Optimize performance issues",
    col_id: 34,
  },
  {
    id: 64,
    photo: undefined,
    name: "fddasasdas",
    email: "csas@gmail.com",
    content: "Bug fixing for IE11 compatibility",
    col_id: 10,
  },
  {
    id: 77,
    photo: undefined,
    name: "fddasasdas",
    email: "csas@gmail.com",
    content: "Create user dashboard UI",
    col_id: 34,
  },
  {
    id: 83,
    photo: undefined,
    name: "ddasasdas",
    email: "asas@gmail.com",
    content: "Deploy application to staging server",
    col_id: 12,
  },
  {
    id: 29,
    photo: undefined,
    name: "fddasasdas",
    email: "ysas@gmail.com",
    content: "Write documentation for new features",
    col_id: 12,
  },
  {
    id: 140,
    photo: undefined,
    name: "fddasasdas",
    email: "asas@gmail.com",
    content: "Conduct usability testing",
    col_id: 90,
  },
  {
    id: 114,
    photo: undefined,
    name: "uddasasgdas",
    email: "asas@gmail.com",
    content: "Refine mobile responsiveness",
    col_id: 12,
  },
  {
    id: 124,
    photo: undefined,
    name: "addasasdas",
    email: "asas@gmail.com",
    content: "Integrate third-party analytics",
    col_id: 12,
  },
  {
    id: 413,
    photo: undefined,
    name: "fddasasdas",
    email: "lsas@gmail.com",
    content: "Implement search functionality",
    col_id: 34,
  },
  {
    id: 144,
    photo: undefined,
    name: "fddasasdas",
    email: "psas@gmail.com",
    content: "Optimize database queries",
    col_id: 12,
  },
  {
    id: 145,
    photo: undefined,
    name: "fddasasdas",
    email: "vsas@gmail.com",
    content: "Design email notification templates",
    col_id: 756,
  },
  {
    id: 164,
    photo: undefined,
    name: "fddasasdas",
    email: "isas@gmail.com",
    content: "Update UI based on client feedback",
    col_id: 756,
  },
  {
    id: 174,
    photo: undefined,
    name: "fddasasdas",
    email: "asas@gmail.com",
    content: "Create admin panel for content management",
    col_id: 34,
  },
  {
    id: 184,
    photo: undefined,
    name: "fddasasdas",
    email: "psas@gmail.com",
    content: "Implement multi-language support",
    col_id: 12,
  },
  {
    id: 194,
    photo: undefined,
    name: "fddasasdas",
    email: "msas@gmail.com",
    content: "Fix cross-browser compatibility issues",
    col_id: 12,
  },
  {
    id: 240,
    photo: undefined,
    name: "fddasasdas",
    email: "rsas@gmail.com",
    content: "Perform security audit",
    col_id: 12,
  },
];

const ProjectManagementDnD = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  console.log("columns", columns);
  // console.log("initialTasks", initialTasks);
  // useEffect(() => {
  //   const updateColumns = () => {
  //     const updatedColumns = initialColumns.map((column) => {
  //       const tasks = initialTasks.filter((task) => task.col_id === column.id);
  //       return {
  //         ...column,
  //         taskIds: tasks.map((task) => task.id),
  //       };
  //     });
  //     setColumns(updatedColumns);
  //   };
  //   updateColumns();
  // }, []);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId, type } = result;

    // If dropped outside the droppable area, do nothing
    if (!destination) {
      return;
    }

    // Reorder columns
    if (type === "column") {
      const newColumns = Array.from(columns);
      const [removed] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, removed);

      setColumns(newColumns);
      return;
    }

    // Reorder within the same column
    if (type === "task") {
      const start = columns.find(
        (col) => col.id === parseInt(source.droppableId)
      );
      const finish = columns.find(
        (col) => col.id === parseInt(destination.droppableId)
      );

      if (!start || !finish) {
        return; // Handle case where start or finish is undefined
      }

      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, parseInt(draggableId));

        const newColumn = {
          ...start,
          taskIds: newTaskIds,
        };

        setColumns((prevColumns) =>
          prevColumns.map((col) => (col.id === start.id ? newColumn : col))
        );
        return;
      }

      // Moving between columns
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, parseInt(draggableId));
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      setColumns((prevColumns) =>
        prevColumns.map((col) => {
          if (col.id === start.id) {
            return newStart;
          }
          if (col.id === finish.id) {
            return newFinish;
          }
          return col;
        })
      );
    }
  };

  return (
    <div
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100%",
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="columns" direction="horizontal" type="column">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "15px",
                width: "100%",
                height: "100%",

                // height: "100%",
                padding: "10px",
                background: "transparent",
              }}
            >
              {columns.map((column, index) => (
                <Draggable
                  key={column.id}
                  draggableId={column.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div style={{}}>
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        style={{
                          ...provided.draggableProps.style,

                          display: "flex",
                          flexDirection: "column",
                          border: "1px solid lightgrey",
                          borderRadius: "9px",
                          minWidth: "285px",
                          height: "90vh",
                          overflow: "auto",

                          background: "transparent",
                          padding: "8px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <h2 style={{ color: "#282a42" }}>{column.title}</h2>
                        <Droppable
                          droppableId={column.id.toString()}
                          type="task"
                        >
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                height: "100%",
                                width: "100%",
                              }}
                            >
                              {column.taskIds.map((taskId, index) => {
                                const task = initialTasks.find(
                                  (t) => t?.id === taskId
                                );
                                if (!task) return null; // Handle case where task is undefined
                                return (
                                  <Draggable
                                    key={task.id}
                                    draggableId={task.id.toString()}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <ProjectManagementCard
                                        provided={provided}
                                        content={task}
                                      />
                                    )}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ProjectManagementDnD;
