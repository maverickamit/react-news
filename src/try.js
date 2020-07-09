const format = (data) => {
  data.filter((row) => {
    return row.firstName == "Skyler";
  });
};

return format(data);
