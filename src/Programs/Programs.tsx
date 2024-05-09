import { FormGroup } from "@mui/material";
import Card from "@mui/material/Card";

import { useEffect } from "react";
import { useState } from "react";

interface Programs {
  programs_name: string;
}

function Programs() {
  const [programs, setPrograms] = useState<Programs[]>([]);

  async function fetchPrograms(): Promise<[]> {
    try {
      const queryParamUserId = sessionStorage.getItem("userId");
      let id = 0;
      if (queryParamUserId) {
        id = parseInt(queryParamUserId);
      }

      const response = await fetch(
        `http://localhost:8080/programs/getPrograms/?userId=${id}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching programs:", error);
      return [];
    }
  }

  useEffect(() => {
    fetchPrograms().then((data) => setPrograms(data));
  }, []);

  return (
    <>
      <h3>Our Programs that might suit you</h3>
      {programs.map((program, index) => (
        <FormGroup className="form" key={index}>
          <Card className="card">{program.programs_name}</Card>
        </FormGroup>
      ))}
    </>
  );
}

export default Programs;
