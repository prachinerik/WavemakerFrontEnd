import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";

interface Option {
  options_id: number;
  options: string;
  option_weight: number;
}

interface SelectedOptions {
  user_id: number;
  options_id: number;
}

function OptionsDisplay() {
  const navigate = useNavigate();
  const [selectedPreferences, setSelectedPreferences] = useState<Option[]>([]);
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    async function fetchUsersPreferences(): Promise<Option[]> {
      const response = await fetch("http://localhost:8080/gets/getPreferences");
      const data = await response.json();
      return data;
    }
    fetchUsersPreferences().then((data) => setOptions(data));
  }, []);

  const postData = async () => {
    try {
      let queryParamUserId = sessionStorage.getItem("userId");
      queryParamUserId = parseInt(queryParamUserId);
      let dataToSend = selectedIds.map((id) => {
        return {
          user_id: queryParamUserId,
          options_id: id,
        };
      });

      const transformesDataToSend = {
        entries: dataToSend,
      };

      const response: AxiosResponse = await axios.post(
        "http://localhost:8080/posts/postPreferences",
        transformesDataToSend
      );

      // Process the response data
    } catch (error) {
      console.log("error");
    }
  };

  const handleSubmit = () => {
    postData();

    navigate("/ourPrograms");
    //setIsLoginDone(false);
  };

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkedId = parseInt(event.target.value);

    if (event.target.checked) {
      setSelectedIds([...selectedIds, checkedId]);
    } else {
      setSelectedIds(selectedIds.filter((id) => id !== checkedId));
    }

    setSelectedPreferences([...selectedPreferences]);
    //arrayOfUserPreferences.push(newPreference);
  };

  return (
    <>
      {options.map((option) => (
        <FormGroup className="form" key={option.options_id}>
          <FormControlLabel
            control={<Checkbox size="medium" />}
            name="Preferences"
            label={option.options}
            value={option.options_id}
            checked={selectedIds.includes(option.options_id)}
            onChange={() => {
              handleCheckboxChange(event);
            }}
          />
        </FormGroup>
      ))}
      <Button type="submit" variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
}

export default OptionsDisplay;
