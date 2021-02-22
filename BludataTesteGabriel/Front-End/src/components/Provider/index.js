import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Api from "../../Services/Api";
import SendIcon from "@material-ui/icons/Send";
import Botao from "../Buttons/envioformulario";
import Lista from "../Listas/provider";
import CustomDialog from "../Alerts/dialog";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flex: 8,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  paper: {
    minHeight: 360,
    minWidth: 360,
    textAlign: "center",
    marginTop: "3%"
  },

  control: {
    padding: theme.spacing(1)
  },

  container: {
    display: "flex",
    flexWrap: "wrap"
  },

  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 251
  },

  dense: {
    marginTop: theme.spacing(2)
  },

  menu: {
    width: 200
  }
}));

const typePerson = [
  {
    value: 1,
    label: "Física"
  },
  {
    value: 2,
    label: "Júridica"
  }
];

export default function SpacingGrid() {
  document.title = "Cadastro de Empresas";
  const classes = useStyles();
  const [hasReturnedSuccess, setHasReturnedSuccess] = useState(false);
  const [hasReturnedSuccessMessage, setHasReturnedSuccessMessage] = useState(
    ""
  );
  const [hasReturnedError, setHasReturnedError] = useState(false);
  const [hasReturnedErrorMessage, setHasReturnedErrorMessage] = useState("");

  const handleCloseErrorModal = () => {
    setHasReturnedError(false);
  };
  const handleCloseSuccessModal = () => {
    setHasReturnedSuccess(false);
  };

  const CreateProvider = async () => {
    try {
      return Api.post(
        "https://localhost:44375/v1/provider",
        values
      ).then(res => {
        setHasReturnedSuccessMessage(res.data.message);
        setHasReturnedSuccess(true);
      });
    } catch (error) {
      setHasReturnedErrorMessage(error.response.data.message);
      setHasReturnedError(true);
    }
  };

  const [values, setValues] = useState({
    name: "",
    birth:"",
    typePerson: 1,
    cpf: "",
    companyId: "1"
    

  });
  const [erros] = useState({});

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const showErrorText = name => {
    let errorText = erros[name];
    if (errorText) return errorText[0];
  };

  return (
    <Container maxWidth="lg">
      {hasReturnedError && (
        <CustomDialog
          open={"Oi"}
          // onExited={() => {}}
          title={"Algo deu errado! Verifique as informações!"}
          //confirmLabel={handleCloseErrorModal}
          onConfirm={handleCloseErrorModal}
          onCancel={handleCloseErrorModal}
        >
          {hasReturnedErrorMessage}
        </CustomDialog>
      )}
      {hasReturnedSuccess && (
        <CustomDialog
          open={"Oi"}
          // onExited={() => {}}
          title={"Cadastro de Fornecedor realizado com sucesso!"}
          //confirmLabel={handleCloseErrorModal}
          onConfirm={handleCloseSuccessModal}
          onCancel={handleCloseSuccessModal}
        >
          {hasReturnedSuccessMessage}
        </CustomDialog>
      )}

      <form className={classes.container} noValidate autoComplete="off">
        <div className={classes.root}>
          <Paper className={classes.paper} style={{ flex: 1 }}>
            <div>
            <TextField
                id="name"
                label="Nome"
                error={erros.name !== undefined}
                className={classes.textField}
                value={values.name}
                onChange={handleChange("name")}
                margin="normal"
                variant="outlined"
                helperText={showErrorText("name")}
                style={{ width: "70%" }}
              />
            </div>
            <div>
            <TextField
                id="birth"
                label="Idade"
                error={erros.birth !== undefined}
                className={classes.textField}
                value={values.birth}
                onChange={handleChange("birth")}
                margin="normal"
                variant="outlined"
                helperText={showErrorText("birth")}
                style={{ width: "70%" }}
              />
            </div>
            <div>
            <TextField
                id="typePerson"
                select
                label="Física/Júridica"
                error={erros.typePerson !== undefined}
                className={classes.textField}
                value={values.typePerson}
                onChange={handleChange("typePerson")}
                helperText={showErrorText("typePerson")}
                SelectProps={{
                  native: true,
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                margin="normal"
                variant="outlined"
                style={{ width: "70%" }}
              >
                {typePerson.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </div>
            <div>
            <TextField
                id="cpf"
                label="CPF/CNPJ"
                error={erros.cpf !== undefined}
                className={classes.textField}
                value={values.cpf}
                onChange={handleChange("cpf")}
                margin="normal"
                variant="outlined"
                helperText={showErrorText("cpf")}
                style={{ width: "70%" }}
              />
            </div>
            <div>
            <TextField
                id="company"
                label="Id Empresa"
                error={erros.company !== undefined}
                className={classes.textField}
                value={values.company}
                onChange={handleChange("company")}
                margin="normal"
                variant="outlined"
                helperText={showErrorText("company")}
                style={{ width: "70%" }}
              />
            </div>
            <Botao
              onClick={() => CreateProvider()}
              label="Cadastrar"
              sendIcon={<SendIcon style={{ marginLeft: "10px" }}></SendIcon>}
            ></Botao>
          </Paper>
          <div style={{ flex: 2 }} className={classes.paper}>
            <Lista />
          </div>
        </div>
      </form>
    </Container>
  );
}
